import React from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { sendCommand } from '../actions/trashcan';

const commandToIcon = {
    empty: 'recycle',
    addTrash: 'plus',
    startTrashFire: 'fire'
};

export const TrashcanButton = ({ command, trashcanId, sendCommand }) => {
    return (
        <button className="trashcan-card__button"
            onClick={() => sendCommand(command, trashcanId)}>
            <FontAwesome name={commandToIcon[command]} />
        </button>
    );
}

const mapDispatchToProps = (dispatch) => ({
    sendCommand: (command, trashcanId) => dispatch(sendCommand(command, trashcanId))
});

export default connect(undefined, mapDispatchToProps)(TrashcanButton);