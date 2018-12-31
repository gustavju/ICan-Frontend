export const setGarbagetrucks = (garbagetrucks) => ({
    type: 'SET_GARBAGETRUCKS',
    garbagetrucks
});

export const updateGarbagetrucks = () => {
    return (dispatch) => {
        fetch('http://localhost:8500/getGarbagetruck').then(response => {
            response.json().then((data) => {
                console.log(data);
                dispatch(setGarbagetrucks(data));
            });
        });
    };
}

export const sendRoute = (selectedTrashcans, selctedGarbagetruck) => {
    return () => {
        let trashcanQuery = '';
        for (let i = 0; i < selectedTrashcans.length; i++) {
            trashcanQuery += `t${i}=${selectedTrashcans[i].trashcanId}&`;
        }
        const url = `http://localhost:8500/garbagetruckRoute?garbagetruckId=${selctedGarbagetruck.garbageTruckId}&num=${selectedTrashcans.length}&${trashcanQuery}`;
        console.log(url);
        fetch(url).then(res => {
            res.json().then((data) => console.log(data.Message));
        });
    }
};

export const getGoogleRoute = (map, maps, origin, waypoints, destination) => {
    return () => {
        const directionsService = new maps.DirectionsService();
        const directionsDisplay = new maps.DirectionsRenderer();
        directionsService.route({
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
                console.log(response);
                directionsDisplay.setDirections(response);
                const routePolyline = new google.maps.Polyline({ path: response.routes[0].overview_path });
                routePolyline.setMap(map);
            } else {
                console.log('Directions request failed due to ' + status);
            }
        });
    }
};

