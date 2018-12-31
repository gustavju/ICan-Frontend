import React from 'react';
import TrashcanButton from './TrashcanButton';
import CirclePercent from './CirclePercent';
import moment from 'moment';

const commands = [
    'empty',
    'addTrash',
    'startTrashFire'
];

const Trashcan = ({ trashcan, percentColor }) => (
    <div className={trashcan.isConnected == 'true' ? 'trashcan-card' : 'trashcan-card disconnected'}>
        <div className="trashcan-card__id">{trashcan.trashcanId}</div>
        <CirclePercent percentColor={percentColor} percent={trashcan.TrashcanHistoryEntry.trashLevel} />
        <div className="trashcan-card__Conn">{trashcan.isConnected == 'true' ? 'Connected' : 'Disconnected'}</div>
        <div className="trashcan-card__temperature">Temperature: {trashcan.TrashcanHistoryEntry.temperature}°C</div>
        <hr/>
        <div className="trashcan-card__text"><span>Status</span> {trashcan.TrashcanHistoryEntry.canStatus}</div>
        <div className="trashcan-card__text"><span>Type</span> {trashcan.type}</div>
        <div className="trashcan-card__text"><span>Location</span> {trashcan.location.longitude}, {trashcan.location.latitude}</div>
        <div className="trashcan-card__text"><span>Last Emptied</span>  {moment(trashcan.TrashcanHistoryEntry.lastEmptied, 'ddd-MMM-D-hh:mm:ss').fromNow()}</div>
        <div className="trashcan-card__text"><span>Data updated</span> {moment(trashcan.TrashcanHistoryEntry.timestamp, 'ddd-MMM-D-hh:mm:ss').fromNow()}</div>
        <div className="trashcan-card__button-container">
            {commands.map((command) => <TrashcanButton key={command} trashcanId={trashcan.trashcanId} command={command} />)}
        </div>
    </div>
);

export default Trashcan;
