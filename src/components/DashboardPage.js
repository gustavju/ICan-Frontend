import React from 'react';
import Trashcan from './Trashcan';
import PageHeader from './PageHeader';
import GoogleMapReact from 'google-map-react';
import FontAwesome from 'react-fontawesome';

const getPercentColor = (percent) => {
    const percentNum = parseInt(percent);
    let color;
    if (percentNum >= 95) {
        color = '#E74C3C';
    } else if (percentNum >= 80) {
        color = '#F5B041';
    } else if (percentNum >= 60) {
        color = '#F4D03F';
    } else if (percentNum >= 40) {
        color = '#58D68D';
    } else {
        color = '#52BE80';
    }
    return color;
}

export default class DashboardPage extends React.Component {
    constructor() {
        super();
        this.state = {
            trashcans: []
        };
        this.interval = setInterval(() => this.updateTrash(), 3000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    updateTrash() {
        fetch('http://localhost:8500/getTrashcans').then(response => {
            response.json().then((data) => {
                console.log(data);
                this.setState(() => ({ trashcans: data }));
            });
        });
    }
    render() {
        return (
            <div>
                <PageHeader title="Trashcans" subTitle={"Connected"} data={this.state.trashcans.length} />
                <GoogleMapReact style={{ width: '100%', height: '400px', position: 'relative' }} bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }} defaultCenter={{ lat: 59.407859, lng: 17.944644 }} defaultZoom={13}>
                    {
                        this.state.trashcans.length > 0 ?
                            this.state.trashcans.map(trashcan => {
                                let color = getPercentColor(trashcan.TrashcanHistoryEntry.trashLevel);
                                if (trashcan.isConnected == 'false') color = 'grey';
                                let markerStyles = {
                                    fontSize: '2rem',
                                    color
                                };
                                return (
                                    <FontAwesome style={markerStyles}
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
                    <div className="trashcan-card__container">
                        {
                            this.state.trashcans.length > 0 ?
                                this.state.trashcans.map(trashcan => {
                                    let color = getPercentColor(trashcan.TrashcanHistoryEntry.trashLevel);
                                    return (
                                        <Trashcan percentColor={color} key={trashcan.trashcanId} trashcan={trashcan} />
                                    )
                                })
                                :
                                <p>No connected trashcans!</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}