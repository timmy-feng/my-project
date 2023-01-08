import React from 'react';

const iconPng = {
    General: require('../assets/marker.png'),
    Food: require('../assets/restaurant.png'),
    Shopping: require('../assets/shopping-cart.png'),
    Memory: require('../assets/heart.png'),
};

function getIcon(iconType, size) {
    return {
        url: String(iconPng[iconType]),
        scaledSize: new window.google.maps.Size(size, size),
        size: new window.google.maps.Size(size, size),
    };
}

export const Marker = (props) => {
    const [marker, setMarker] = React.useState();

    React.useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker());
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        }
    }, [marker]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions({...props, icon: getIcon(props.pinType, 32)});
            window.google.maps.event.clearInstanceListeners(marker);
            marker.addListener('click', props.onClick);

            marker.addListener('mouseover', () => {
                marker.setOptions({icon: getIcon(props.pinType, 40)});
            });
            marker.addListener('mouseout', () => {
                marker.setOptions({icon: getIcon(props.pinType, 32)});
            });
        }
    }, [marker, props]);

    return null;
};