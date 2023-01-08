import React from 'react';

import { NavLink, useParams } from 'react-router-dom';

import { PinDetails } from './pinDetails';

import pinRequester from '../../utils/pinRequests';

import { useToken } from '../../hooks/useToken';

export const DetailsPanel = ({setFocus}) => {
    const { pinId } = useParams();

    const [token, setToken] = useToken();

    const [pin, setPin] = React.useState();

    React.useEffect(() => {
        pinRequester.getPin(pinId, token).then(setPin);
    }, [pinId]);

    return (
        <div>
            <h2>Pin Details</h2>
            {pin && pin._id == pinId ? (
                <div>
                    <PinDetails pin={pin} setFocus={setFocus} />
                    <hr/>
                    <nav>
                        <NavLink to={'/update/' + pinId}>Update Pin</NavLink>
                        <span> | </span>
                        <NavLink to={'/delete/' + pinId}>Delete Pin</NavLink>
                        <span> | </span>
                        <NavLink to='/create'>Create Pin</NavLink>
                    </nav>
                </div>
            ) : (
                <div>
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
};