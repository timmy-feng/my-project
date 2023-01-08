import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { loginUser, registerUser, setToken } from '../utils/loginRequests';

export const Login = ({onSubmit, isRegister}) => {
    const navigate = useNavigate();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-4 mt-5'>
                    <h2>{isRegister ? 'Get started with PinNotes' : 'Log in to PinNotes'}</h2>
                    <form onSubmit={async (event) => {
                        event.preventDefault();
                        onSubmit(isRegister ? await registerUser({username, password}) : await loginUser({username, password}));
                        navigate('/');
                    }}>
                        <div className='form-group'>
                            <label htmlFor='username'>Username</label>
                            <input className='form-control' type='text' id='username' value={username} onChange={(event) => setUsername(event.target.value)} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input className='form-control' type='password' id='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>

                        <div className='form-group'>
                            <button type='submit' className='btn btn-primary'>{isRegister ? 'Register' : 'Log in'}</button>
                        </div>
                    </form>
                    {isRegister ? null : <p>No account yet? <NavLink to='/register'>Sign up here.</NavLink></p>}
                </div>
            </div>
        </div>
    );
};