import React from 'react';

import { NavLink, useParams } from 'react-router-dom';

import pinRequester from '../../utils/pinRequests';

import { useToken } from '../../hooks/useToken';

const TagButton = ({onClick, value}) => {
    return (
        <span className='badge badge-light'>
            <span>#{value} </span>
            <span type='button' onClick={onClick}>&times;</span>
        </span>
    );
};

const pinTypes = ['General', 'Food', 'Shopping', 'Memory'];

export const CreatePanel = ({onSubmit, isUpdate, clickLatLng}) => {
    const { pinId } = useParams();

    const [token, setToken] = useToken();

    const [pin, setPin] = React.useState({
        title: '',
        pinType: pinTypes[0],
        lat: 0,
        lng: 0,
        contents: '',
        tags: [],
    });

    const [tag, setTag] = React.useState('');

    React.useEffect(() => {
        if (isUpdate) {
            pinRequester.getPin(pinId, token).then(setPin);
        }
    }, [pinId]);

    React.useEffect(() => {
        if (!isUpdate && clickLatLng) {
            setPin({...pin, lat: clickLatLng.lat(), lng: clickLatLng.lng()});
        }
    }, [clickLatLng]);

    return (
        <div>
            <h2>Pin {isUpdate ? 'Update' : 'Create'}</h2>
            <p>{isUpdate ? 'Update pin.' : 'Add a pin to your map.'}</p>
            <form onSubmit={(event) => {
                event.preventDefault();
                onSubmit(pin, pinId);
            }}>
                <div className='form-group row'>
                    <label className='col-2 col-form-label' htmlFor='title'>Title</label>
                    <input 
                        type='text'
                        className='col-10 form-control'
                        required
                        id='title'
                        value={pin.title}
                        onChange={(e) => setPin({...pin, title: e.target.value})}
                    />
                </div>

                <div className='form-group row'>
                    <label className='col-2 col-form-label' htmlFor='pinType'>Type</label>
                    <select 
                        className='col-10 form-control'
                        id='pinType'
                        value={pin.pinType}
                        onChange={(e) => setPin({...pin, pinType: e.target.value})}
                    >
                        {pinTypes.map((typeOption) => <option key={typeOption} value={typeOption}>{typeOption}</option>)}
                    </select>
                </div>

                <div className='row'>
                    <div className='form-group col row'>
                        <label className='col-4 col-form-label' htmlFor='lat'>Latitude</label>
                        <input
                            type='number'
                            className='col-8 form-control'
                            step='any'
                            required
                            id='lat'
                            value={pin.lat}
                            onChange={(e) => setPin({...pin, lat: e.target.value})}
                        />
                    </div>
                    <div className='form-group col row'>
                        <label className='col-4 col-form-label' htmlFor='lng'>Longtitude</label>
                        <input
                            type='number'
                            className='col-8 form-control'
                            step='any'
                            required
                            id='lng'
                            value={pin.lng}
                            onChange={(e) => setPin({...pin, lng: e.target.value})}
                        />
                    </div>
                </div>

                <div className='form-group row'>
                    <label className='col-2 col-form-label' htmlFor='contents'>Contents</label>
                    <textarea
                        className='col-10 form-control'
                        rows='5'
                        id='contents'
                        value={pin.contents}
                        onChange={(e) => setPin({...pin, contents: e.target.value})}
                    />
                </div>

                <div className='form-group row align-items-center'>
                    <div className='col-8'>
                        {pin.tags.map((tagName, i) => (
                            <TagButton key={i} value={tagName} onClick={() => {
                                const newTags = [...pin.tags];
                                newTags.splice(i, 1);
                                setPin({...pin, tags: newTags});
                            }} />
                        ))}
                    </div>
                    <div className='col-4 input-group input-group'>
                        <input className='form-control' id='tag' type='text' value={tag} onChange={(e) => setTag(e.target.value)} />
                        <div className='input-group-append'>
                            <button className='btn btn-outline-secondary' type='button' onClick={() => {
                                setPin({...pin, tags: [...pin.tags, tag]});
                                setTag('');
                            }}>Tag</button>
                        </div>
                    </div>
                </div>

                <div className='form-group'>
                    <input type='submit' value={isUpdate ? 'Update' : 'Create'} className='btn btn-primary'/>
                </div>
            </form>
            <hr/>
            <NavLink to={isUpdate ? '/details/' + pinId : '/'}>Cancel</NavLink>
        </div>
    )
};