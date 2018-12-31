import React from 'react';
import TrashcanTableRow from './TrashcanTableRow';

const TrashcanTable = ({trashcans, selectTrashcan}) => (
    <div className="trashcan-table">
        <h3 className="trashcan-table__title">Trashcans</h3>
        <div className="trashcan-table__header">
        <div>ID</div>
        <div>Status</div>
        <div>Trashlevel</div>
        <div>Temperature</div>
        <div>Type</div>
        </div>
        {
            trashcans.length > 0 ? trashcans.map(trashcan => (<TrashcanTableRow selectTrashcan={selectTrashcan} key={trashcan.trashcanId} trashcan={trashcan}/>)) : ''
        }
    </div>
)

export default TrashcanTable;