import React from 'react';

import { NavLink, useParams } from 'react-router-dom';

import pinRequester from '../../utils/pinRequests';

import { useToken } from '../../hooks/useToken';

export const TagPanel = () => {
    const { tag } = useParams();

    const [token, setToken] = useToken();

    const [pins, setPins] = React.useState([]);

    React.useEffect(() => {
        pinRequester.getPinsByTag(tag, token).then(setPins);
    }, []);

    return (
        <div>
            <h2>Tag: <span className='badge badge-light'>#{tag}</span></h2>
            <ul className='list-group'>
                {pins.map((pin, i) => (
                    <li className='list-group-item' key={i}>
                        <NavLink to={'/details/' + pin._id}>{pin.title}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};