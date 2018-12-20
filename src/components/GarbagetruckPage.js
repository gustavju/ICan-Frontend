import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import FontAwesome from 'react-fontawesome';
import TrashcanTable from './TrashcanTable';
import PageHeader from './PageHeader';
import { getPercentColor } from '../styles/styleFunctions';

class GarbagetruckPage extends React.Component {
    constructor() {
        super();
        this.state = {
            garbagetrucks: []
        };
        this.updateGarbagetrucks = this.updateGarbagetrucks.bind(this);
    }
    updateGarbagetrucks() {
        fetch('http://localhost:8500/getGarbagetruck').then(response => {
            response.json().then((data) => {
                console.log(data);
                this.setState(() => ({ garbagetrucks: data }));
            });
        });
    }

    render() {
        return (
            <div>
                <PageHeader title="Garbagetrucks" subTitle={"Connected"} data={this.state.garbagetrucks.length} />
                <GoogleMapReact style={{ width: '100%', height: '400px', position: 'relative' }} bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }} defaultCenter={{ lat: 59.407859, lng: 17.944644 }} defaultZoom={13}>
                    {
                        this.state.garbagetrucks.length > 0 ?
                            this.state.garbagetrucks.map(garbagetruck => {
                                let markerStyles = {
                                    fontSize: '2rem',
                                    color: 'grey'
                                };
                                return (
                                    <FontAwesome style={markerStyles}
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
                                let color = getPercentColor(trashcan.TrashcanHistoryEntry.trashLevel);
                                if (trashcan.isConnected == 'false') color = 'grey';
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
                    <button className="button" onClick={this.updateGarbagetrucks}>Update</button>
                    <div>{this.state.garbagetrucks.map(garbagetruck => <div>{garbagetruck.garbageTruckId}</div>)}</div>
                    <TrashcanTable trashcans={this.props.trashcans} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        trashcans: state.trashcans
    }
};

export default connect(mapStateToProps, undefined)(GarbagetruckPage);