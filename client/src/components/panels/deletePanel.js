import React from 'react';

import { NavLink, useParams } from 'react-router-dom';

import { PinDetails } from './pinDetails';

import pinRequester from '../../utils/pinRequests';

import { useToken } from '../../hooks/useToken';

export const DeletePanel = ({onClick}) => {
    const { pinId } = useParams();

    const [token, setToken] = useToken();

    const [pin, setPin] = React.useState();

    React.useEffect(() => {
        pinRequester.getPin(pinId, token).then(setPin);
    }, [pinId]);

    return (
        <div>
            <h2>Pin Delete</h2>
            {pin && pin._id == pinId ? (
                <div>
                    <p>Do you really want to delete this pin?</p>
                    <PinDetails pin={pin} style={{marginTop: '20px', marginLeft: '20px', marginBottom: '20px'}}/>
                    <button className='btn btn-primary' onClick={() => onClick(pinId)}>Delete</button>
                    <hr/>
                    <NavLink to={'/details/' + pinId}>Cancel</NavLink>
                </div>
            ) : (
                <div>
                    <p>Loading...</p>
                </div>
            )}
        </div>
    )
};