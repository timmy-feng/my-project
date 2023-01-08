import React from 'react';

export const Map = ({center, zoom, onClick, onIdle, children}) => {
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: center ? center : { lat: 29.58, lng: -95.6 },
                zoom: zoom ? zoom : 13,
                disableDefaultUI: true,
                mapId: 'c1c1fe0b6a361ad',
            }));
        }
    }, [ref, map]);

    React.useEffect(() => {
        if (map) {
            window.google.maps.event.clearInstanceListeners(map);
            map.addListener('click', onClick);
            map.addListener('idle', () => onIdle(map));
        }
    }, [map]);

    React.useEffect(() => {
        console.log('hit');
        if (map && center && zoom) {
            map.panTo(center);
            map.setOptions({zoom: zoom});
        }
    }, [map, center, zoom]);

    return (
        <div ref={ref} style={{height: '640px', width: '100%'}}>
            {
                React.Children.map(children, (child) =>
                    React.cloneElement(child, {map})
                )
            }
        </div>
    );
}