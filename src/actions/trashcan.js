export const setTrashcans = (trashcans) => ({
    type: 'SET_TRASHCANS',
    trashcans
});

export const updateTrashcans = () => {
    return (dispatch) => {
        fetch('http://localhost:8500/getTrashcans').then(response => {
            response.json().then((data) => {
                console.log(data);
                dispatch(setTrashcans(data));
            });
        });
    };
}

export const sendCommand = (command, trashcanId) => {
    return () => {
        const fetchUrl = `http://localhost:8500/trashcanCommand?command=${command}&id=${trashcanId}`;
        fetch(fetchUrl).then(res => {
            res.json().then((data) => console.log(data.Message));
        });
    }
}