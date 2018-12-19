import React from 'react';
import PageHeader from './PageHeader';

export default class GarbagetruckPage extends React.Component {
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
                <div className="content-container">
                <button className="button" onClick={this.updateGarbagetrucks}>Update</button>                
                <div>{this.state.garbagetrucks.map(garbagetruck => <div>{garbagetruck.garbageTruckId}</div>)}</div>
                </div>
            </div>
        );
    }
}