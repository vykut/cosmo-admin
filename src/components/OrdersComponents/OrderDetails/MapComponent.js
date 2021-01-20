import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: 'auto',
    height: '400px'
};

const center = {
    lat: 44.535417,
    lng: 26.171885
};

function MapComponent({ address }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script2',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        language: 'ro',
        region: 'ro',
    })

    console.log(isLoaded, address)

    return isLoaded && address ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: address?.latitude || center.lat, lng: address?.longitude || center.lng }}
            zoom={15}
            tilt={0}
        >
            <Marker
                position={{ lat: address?.latitude || center.lat, lng: address?.longitude || center.lng }}
            />
        </GoogleMap>
    ) : <></>
}

export default React.memo(MapComponent)