import React from 'react';

export function useToken() {
    const getToken = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        return token?.token;
    };

    const [internalToken, setInternalToken] = React.useState(getToken());

    const setToken = (token) => {
        localStorage.setItem('token', JSON.stringify({token}));
        setInternalToken(token);
    };

    return [internalToken, setToken];
}