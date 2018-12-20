import React from 'react';

const TrashcanTableRow = ({ trashcan }) => (
    <div className="trashcan-table__row">
        <div>{trashcan.trashcanId}</div>
        <div>{trashcan.TrashcanHistoryEntry.trashLevel}%</div>
        <div>{trashcan.TrashcanHistoryEntry.temperature}°C</div>
    </div>
)

export default TrashcanTableRow;