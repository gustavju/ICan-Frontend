import React from 'react';
import TrashcanTableRow from './TrashcanTableRow';

const TrashcanTable = ({trashcans}) => (
    <div className="trashcan-table">
        <h3 className="trashcan-table__title">Trashcans</h3>
        <div className="trashcan-table__header">
        <div>ID</div>
        <div>Trashlevel</div>
        <div>Temperature</div>
        </div>
        {
            trashcans.length > 0 ? trashcans.map(trashcan => (<TrashcanTableRow key={trashcan.trashcanId} trashcan={trashcan}/>)) : ''
        }
    </div>
)

export default TrashcanTable;