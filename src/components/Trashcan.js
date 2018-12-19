import React from 'react';
import TrashcanButton from './TrashcanButton';

const commands = [
    'empty',
    'addTrash',
    'startTrashFire'
];

const Trashcan = ({trashcan}) => (
    <div className="trashcan-card">
        <div className="trashcan-card__id">ID: {trashcan.trashcanId}</div>
        <div className="trashcan-card__trashlevel">Trashlevel: {trashcan.TrashcanHistoryEntry.trashLevel}%</div>
        <hr/>
        <div className="trashcan-card__temperature">Temperature: {trashcan.TrashcanHistoryEntry.temperature}°C</div>
        <div className="trashcan-card__text"><span>Location:</span> {trashcan.location.longitude}, {trashcan.location.latitude}</div>
        <div className="trashcan-card__text"><span>Last Emptied:</span> {trashcan.TrashcanHistoryEntry.lastEmptied}</div>
        <div className="trashcan-card__text"><span>Data updated:</span> {trashcan.TrashcanHistoryEntry.timestamp}</div>
        <div className="trashcan-card__button-container">
            {commands.map((command) => <TrashcanButton key={command} trashcanId={trashcan.trashcanId} command={command} />)}
        </div>
    </div>
);

export default Trashcan;
