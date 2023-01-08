import React from 'react';

import { Routes, Route, useNavigate } from 'react-router-dom';

import { MapView } from './components/mapView';
import { NavBar } from './components/navBar';
import { Login } from './components/login';

import { getUsername } from './utils/loginRequests';

import { useToken } from './hooks/useToken';

export const App = () => {
    const navigate = useNavigate();

    const [token, setToken] = useToken();
    const [username, setUsername] = React.useState();

    React.useEffect(() => {
        if (token) {
            getUsername(token).then(setUsername);
        } else {
            setUsername(undefined);
        }
    }, [token]);

    const onSubmit = (token) => setToken(token);
    const signOut = (event) => {
        event.preventDefault();
        setToken(undefined);
        navigate('/login');
    };

    return (
        <div>
            <NavBar username={username} signOut={signOut} />

            <Routes>
                <Route path='/login' element={<Login onSubmit={onSubmit} />} />
                <Route path='/register' element={<Login isRegister onSubmit={onSubmit}/>} />
                <Route path='*' element={<MapView />} />
            </Routes>
        </div>
    );
};