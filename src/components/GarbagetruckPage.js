import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import FontAwesome from 'react-fontawesome';
import TrashcanTable from './TrashcanTable';
import PageHeader from './PageHeader';
import GarbagetruckCard from './GarbagetruckCard';
import { getPercentColor } from '../styles/styleFunctions';

export class GarbagetruckPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTrashcans: [],
            selctedGarbagetruck: {},
            map: '',
            maps: ''
        };
    }
    sendRoute = () => {
        let trashcanQuery = '';
        const selectedTrashcans = this.state.selectedTrashcans;
        for (let i = 0; i < selectedTrashcans.length; i++) {
            trashcanQuery += `t${i}=${selectedTrashcans[i].trashcanId}&`;
        }
        const url = `http://localhost:8500/garbagetruckRoute?garbagetruckId=${this.state.selctedGarbagetruck.garbageTruckId}&num=${selectedTrashcans.length}&${trashcanQuery}`;
        console.log(url);
        fetch(url).then(res => {
            res.json().then((data) => console.log(data.Message));
        });
        this.getGoogleRoute();
    }
    selectTrashcan = (e, id) => {
        const element = e.target;
        if (!element.classList.contains('selected')) {
            element.classList.add("selected");
            let trashcan = this.props.trashcans.find(trashcan => trashcan.trashcanId === id);
            this.setState(() => ({ selectedTrashcans: [...this.state.selectedTrashcans, trashcan] }));
        } else {
            element.classList.remove("selected");
            let filterdTrashcans = this.state.selectedTrashcans.filter(trashcan => !trashcan.trashcanId === id);
            this.setState(() => ({ selectedTrashcans: filterdTrashcans }));
        }
    }
    selectGarbagetruck = (e, id) => {
        const element = e.target;
        if (!element.classList.contains('selected')) {
            element.classList.add("selected");
            let garbagetruck = this.props.garbagetrucks.find(garbagetruck => garbagetruck.garbageTruckId === id);
            this.setState(() => ({ selctedGarbagetruck: garbagetruck }));
        } else {
            element.classList.remove("selected");
            this.setState(() => ({ selctedGarbagetruck: '' }));
        }
    }
    getGoogleRoute = () => {
        let map = this.state.map;
        let maps = this.state.maps;
        const directionsService = new maps.DirectionsService();
        const directionsDisplay = new maps.DirectionsRenderer();
        let waypoints = this.state.selectedTrashcans.map(trashcan => ({ location: new google.maps.LatLng(trashcan.location.latitude, trashcan.location.longitude) }))
        directionsService.route({
            origin: new google.maps.LatLng(this.state.selctedGarbagetruck.location.latitude, this.state.selctedGarbagetruck.location.longitude),
            destination: new google.maps.LatLng(59.383689, 17.938740),
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
                console.log(response);
                directionsDisplay.setDirections(response);
                const routePolyline = new google.maps.Polyline({ path: response.routes[0].overview_path });
                routePolyline.setMap(map);
            } else {
                console.log('Directions request failed due to ' + status);
            }
        });
    };
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
                            this.props.garbagetrucks.map(garbagetruck => {
                                let markerStyles = {
                                    fontSize: '2rem',
                                    color: 'grey'
                                };
                                return (
                                    <FontAwesome style={markerStyles}
                                        key={garbagetruck.garbageTruckId}
                                        lat={garbagetruck.location.latitude}
                                        lng={garbagetruck.location.longitude}
                                        text={garbagetruck.garbageTruckId}
                                        name="truck" >
                                    </FontAwesome>
                                );
                            }
                            ) : <p>No connected garbagetrucks!</p>
                    }
                    {
                        this.props.trashcans.length > 0 ?
                            this.props.trashcans.map(trashcan => {
                                let color = trashcan.isConnected == 'false' ? 'grey' : getPercentColor(trashcan.TrashcanHistoryEntry.trashLevel);
                                let markerStyles = {
                                    fontSize: '2rem',
                                    color
                                };
                                return (
                                    <FontAwesome style={markerStyles}
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
                    <button className="button" onClick={this.sendRoute}>Send route</button>
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
    }
};

export default connect(mapStateToProps, undefined)(GarbagetruckPage);