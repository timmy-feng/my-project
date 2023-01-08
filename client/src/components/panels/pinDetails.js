import React from 'react';

import { NavLink } from "react-router-dom";

import { getAddress } from '../../utils/geoRequests';

export const PinDetails = ({pin, style, setFocus}) => {
    const [address, setAddress] = React.useState('Loading address...');

    React.useEffect(() => {
        getAddress({lat: pin.lat, lng: pin.lng}).then(setAddress);
    }, []);

    const handleClick = () => setFocus({lat: pin.lat, lng: pin.lng}, 15);

    return (
        <div style={style}>
            <p>
                <b>{pin.title}</b>
                <button onClick={handleClick} className='btn btn-outline-secondary float-right'>Center</button>
            </p>
            <p><em>{address}</em></p>
            <p>{pin.pinType}</p>
            <p>{pin.contents}</p>
            <nav>
                {pin.tags.map((tagName, i) =>
                    <span key={i}><NavLink className='badge badge-light' to={'/tag/' + tagName}>#{tagName}</NavLink> </span>
                )}
            </nav>
        </div>
    );
};