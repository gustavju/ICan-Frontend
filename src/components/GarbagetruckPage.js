import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import FontAwesome from 'react-fontawesome';
import TrashcanTable from './TrashcanTable';
import PageHeader from './PageHeader';
import GarbagetruckCard from './GarbagetruckCard';
import { sendRoute, getGoogleRoute } from '../actions/garbagetruck';
import { getPercentColor } from '../styles/styleFunctions';
import { store } from '../app';

export class GarbagetruckPage extends React.Component {
    constructor(props) {
        super(props);
        let unsub = store.subscribe(this.handleGarbagetruckMove);
        this.state = {
            selectedTrashcans: [],
            selctedGarbagetruck: {},
            map: '',
            maps: '',
            origin: '',
            waypoints: [],
            destination: ''
        };
    }
    handleGarbagetruckMove = () => {
        if (this.props.garbagetrucks.length > 0) {
            let currentLocation = store.getState().garbagetrucks[0].location;
            if (this.state.origin && currentLocation.latitude != this.state.origin.lat()) {
                const origin = new google.maps.LatLng(currentLocation.latitude, currentLocation.longitude);
                const waypoints = this.state.waypoints.splice(1, 1);
                this.setState(() => ({ origin, waypoints }));
                this.props.route.setMap(null);
                this.props.getGoogleRoute(this.state.map, this.state.maps, origin, waypoints, this.state.destination);
            }
        }
    }
    handleSendRoute = () => {
        this.props.sendRoute(this.state.selectedTrashcans, this.state.selctedGarbagetruck);
        const origin = new google.maps.LatLng(this.state.selctedGarbagetruck.location.latitude, this.state.selctedGarbagetruck.location.longitude)
        const waypoints = this.state.selectedTrashcans.map(trashcan => ({ location: new google.maps.LatLng(trashcan.location.latitude, trashcan.location.longitude) }))
        const destination = new google.maps.LatLng(59.383689, 17.938740)
        this.setState(() => ({ origin, waypoints, destination }));
        this.props.getGoogleRoute(this.state.map, this.state.maps, origin, waypoints, destination);
    }
    selectElement = (element) => {
        const isSelected = element.classList.contains('selected');
        isSelected ? element.classList.remove("selected") : element.classList.add("selected");
        return isSelected;
    }
    selectTrashcan = (e, id) => {
        const isSelected = this.selectElement(e.target);
        let selectedTrashcans;
        if (!isSelected) {
            selectedTrashcans = [...this.state.selectedTrashcans, this.props.trashcans.find(trashcan => trashcan.trashcanId === id)];
        } else {
            selectedTrashcans = this.state.selectedTrashcans.filter(trashcan => !trashcan.trashcanId === id);
        }
        this.setState(() => ({ selectedTrashcans }));
    }
    selectGarbagetruck = (e, id) => {
        const isSelected = this.selectElement(e.target);
        let selctedGarbagetruck;
        if (!isSelected) {
            selctedGarbagetruck = this.props.garbagetrucks.find(garbagetruck => garbagetruck.garbageTruckId === id);
        } else {
            selctedGarbagetruck = '';
        }
        this.setState(() => ({ selctedGarbagetruck }));
    }
    render() {
        return (
            <div>
                <PageHeader title="Garbagetrucks" subTitle={"Connected"} data={this.props.garbagetrucks.length} />
                <GoogleMapReact
                    style={{ width: '100%', height: '400px', position: 'relative' }}
                    bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                    defaultCenter={{ lat: 59.407859, lng: 17.944644 }}
                    defaultZoom={13}
                    onGoogleApiLoaded={({ map, maps }) => this.setState({ map, maps })}
                    yesIWantToUseGoogleMapApiInternals
                >
                    {
                        this.props.garbagetrucks.length > 0 ?
                            this.props.garbagetrucks.map(garbagetruck =>
                                (
                                    <FontAwesome
                                        style={{ fontSize: '2rem', color: 'grey' }}
                                        key={garbagetruck.garbageTruckId}
                                        lat={garbagetruck.location.latitude}
                                        lng={garbagetruck.location.longitude}
                                        text={garbagetruck.garbageTruckId}
                                        name="truck">
                                    </FontAwesome>
                                )

                            ) : <p>No connected garbagetrucks!</p>
                    }
                    {
                        this.props.trashcans.length > 0 ?
                            this.props.trashcans.map(trashcan => {
                                let color = trashcan.isConnected == 'false' ? 'grey' : getPercentColor(trashcan.TrashcanHistoryEntry.trashLevel);
                                return (
                                    <FontAwesome
                                        style={{ fontSize: '2rem', color }}
                                        key={trashcan.trashcanId}
                                        lat={trashcan.location.latitude}
                                        lng={trashcan.location.longitude}
                                        text={trashcan.trashcanId}
                                        name="map-marker" >
                                    </FontAwesome>
                                );
                            }
                            ) : <p>No connected trashcans!</p>
                    }
                </GoogleMapReact>
                <div className="content-container">
                    <button className="button" onClick={this.handleSendRoute}>Send route</button>
                    <div>{this.props.garbagetrucks.length > 0 && this.props.garbagetrucks.map(garbagetruck => <GarbagetruckCard key={garbagetruck.garbageTruckId} selectGarbagetruck={this.selectGarbagetruck} garbagetruck={garbagetruck} />)}</div>
                    <TrashcanTable selectTrashcan={this.selectTrashcan} trashcans={this.props.trashcans} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        trashcans: state.trashcans,
        garbagetrucks: state.garbagetrucks,
        route: state.route,
    }
};

const mapDispatchToProps = (dispatch) => ({
    sendRoute: (selectTrashcans, selectGarbagetruck) => dispatch(sendRoute(selectTrashcans, selectGarbagetruck)),
    getGoogleRoute: (map, maps, origin, waypoints, destination) => dispatch(getGoogleRoute(map, maps, origin, waypoints, destination))
});

export default connect(mapStateToProps, mapDispatchToProps)(GarbagetruckPage);