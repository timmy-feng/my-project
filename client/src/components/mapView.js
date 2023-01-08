import React from 'react';

import { useNavigate, Routes, Route } from 'react-router-dom';

import { Wrapper } from '@googlemaps/react-wrapper';

import { Marker } from './marker';
import { Map } from './map';
import { DetailsPanel } from './panels/detailPanel';
import { DeletePanel } from './panels/deletePanel';
import { CreatePanel } from './panels/createPanel';
import { HomePanel } from './panels/homePanel';
import { TagPanel } from './panels/tagPanel';

import pinRequester from '../utils/pinRequests';
import { useToken } from '../hooks/useToken';

export const MapView = () => {
    const navigate = useNavigate();

    const [token, setToken] = useToken();

    const [pins, setPins] = React.useState([]);

    const refreshPins = () => pinRequester.getPins(token).then(setPins);
    React.useEffect(() => { refreshPins(); }, []);

    const onClickDelete = (pinId) => pinRequester.deletePin(pinId, token)
        .then(navigate('/'))
        .then(refreshPins);

    const onClickUpdate = (pin, pinId) => pinRequester.updatePin(pin, pinId, token)
        .then(navigate('/details/' + pinId))
        .then(refreshPins);

    const onClickCreate = (pin) => pinRequester.createPin(pin, token)
        .then((newPin) => navigate('/details/' + newPin._id))
        .then(refreshPins);

    const [mapCenter, setMapCenter] = React.useState();
    const [mapZoom, setMapZoom] = React.useState();
    const [clickPoint, setClickPoint] = React.useState();

    const onMapClick = (event) => setClickPoint(event.latLng);

    const onMapIdle = (map) => {
        setMapCenter(map.center);
        setMapZoom(map.zoom);
    };

    const setFocus = (center, zoom) => {
        setMapCenter(center);
        setMapZoom(zoom);
    };

    const markers = pins.map((pin) => (
        <Marker
            key={pin._id}
            id={pin._id}
            position={{lat: pin.lat, lng: pin.lng}}
            pinType={pin.pinType}
            onClick={() => navigate('/details/' + pin._id)}
        />
    ));

    return (
        <div className='container-fluid'>
            <div className='row mt-3'>
                <div className='col m-3'>
                    <Wrapper apiKey='AIzaSyAVQC2PrjjLeRF3IXjlvC5-mdyh-r-tnk8'>
                        <Map center={mapCenter} zoom={mapZoom} onClick={onMapClick} onIdle={onMapIdle}>
                            {markers}
                        </Map>
                    </Wrapper>
                </div>

                <div className='col m-3 p-3'>
                    <Routes>
                        <Route index element={<HomePanel />} />
                        <Route path='/details/:pinId' element={<DetailsPanel setFocus={setFocus} />} />
                        <Route path='/tag/:tag' element={<TagPanel />} />
                        <Route path='/delete/:pinId' element={<DeletePanel onClick={onClickDelete} setFocus={setFocus} />} />
                        <Route path='/update/:pinId' element={<CreatePanel isUpdate onSubmit={onClickUpdate} setFocus={setFocus} />} />
                        <Route path='/create' element={<CreatePanel clickLatLng={clickPoint} onSubmit={onClickCreate} setFocus={setFocus} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};