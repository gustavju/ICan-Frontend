import React from 'react';
import Trashcan from './Trashcan';
import PageHeader from './PageHeader';
import GoogleMapReact from 'google-map-react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { getPercentColor } from '../styles/styleFunctions';

export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
    }
    handleMouseEnter() {

    }
    handleMouseLeave() {

    }
    render() {
        return (
            <div>
                <PageHeader title="Trashcans" subTitle={"Connected"} data={this.props.trashcans.length} />
                <GoogleMapReact
                    style={{ width: '100%', height: '400px', position: 'relative' }}
                    bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                    defaultCenter={{ lat: 59.407859, lng: 17.944644 }}
                    defaultZoom={13}
                    onChildMouseEnter={this.handleMouseEnter}
                    onChildMouseLeave={this.handleMouseLeave}
                >
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
                    <div className="trashcan-card__container">
                        {
                            this.props.trashcans.length > 0 ?
                                this.props.trashcans.map(trashcan => {
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

const mapStateToProps = (state) => {
    return {
        trashcans: state.trashcans
    }
};

export default connect(mapStateToProps, undefined)(DashboardPage);