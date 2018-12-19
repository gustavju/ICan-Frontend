import React from 'react';

export default class TrashcanButton extends React.Component {
    constructor(props) {
        super(props);
        this.sendCommand = this.sendCommand.bind(this);
    }
    sendCommand(e, trashcanId) {
        const target = e.target.value;
        const fetchUrl = `http://localhost:8500/trashcanCommand?command=${target}&id=${trashcanId}`;
        fetch(fetchUrl).then(res => {
            res.json().then((data) => console.log(data.Message));
        });
    }
    render() {
        return (
            <button className="trashcan-card__button" value={this.props.command} onClick={(e) => this.sendCommand(e, this.props.trashcanId)}>{this.props.command.substring(0, 1)}</button>
        );
    }
}