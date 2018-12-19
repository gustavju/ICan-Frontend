import React from 'react';
import Trashcan from './Trashcan';
import PageHeader from './PageHeader';
import GoogleMapReact from 'google-map-react';


export default class DashboardPage extends React.Component {
    constructor() {
        super();
        this.state = {
            trashcans: []
        };
        this.updateTrash = this.updateTrash.bind(this);
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
                    this.state.trashcans.map(trashcan => 
                        <div style={{height: '10px', width: '10px', backgroundColor: 'red'}} 
                        lat={trashcan.location.latitude}
                        lng={trashcan.location.longitude}
                        text={trashcan.trashcanId}>
                        </div>
                        ) : <p>No connected trashcans!</p>
                }
                </GoogleMapReact>
                <div className="content-container">
                    <button className="button" onClick={this.updateTrash}>Update</button>
                    <div className="trashcan-card__container">
                    {
                        this.state.trashcans.length > 0 ?
                        this.state.trashcans.map(trashcan => <Trashcan key={trashcan.trashcanId} trashcan={trashcan} />)
                        :
                        <p>No connected trashcans!</p>
                    }
                    </div>
                </div>
            </div>
        );
    }
}