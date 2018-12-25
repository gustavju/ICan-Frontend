import React from 'react';

const GarbagetruckCard = ({ selectGarbagetruck, garbagetruck }) => (
    <div onClick={(e) => selectGarbagetruck(e, garbagetruck.garbageTruckId)} className="garbagetruck-card">
        <div className="garbagetruck-card__id">{garbagetruck.garbageTruckId}</div>
        <div className="garbagetruck-card__text"><span>Capacity:</span>{garbagetruck.capacity}</div>
        <div className="garbagetruck-card__text"><span>Location:</span>{garbagetruck.location.longitude}, {garbagetruck.location.latitude}</div>
    </div>
);

export default GarbagetruckCard;