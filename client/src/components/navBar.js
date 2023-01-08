import React from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

export const NavBar = ({username, signOut}) => {
    return (
        <nav className='navbar navbar-expand navbar-light bg-light'>
            <span className='navbar-brand'>PinNotes</span>
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <NavLink className='nav-link' to='/'>Home</NavLink>
                </li>
            </ul>

            {username ? (
                <ul className='navbar-nav ml-auto'>
                    <li className='nav-item'>
                        <span className='nav-link'>{username}</span>
                    </li>
                    <li className='nav-item'>
                        <a href='' className='nav-link' onClick={signOut}>Sign Out</a>
                    </li>
                </ul>
            ) : (
                <ul className='navbar-nav ml-auto'>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/login'>Log in</NavLink>
                    </li>
                </ul>
            )}
        </nav>
    );
};