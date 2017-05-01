import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

const SimpleMap = (props) => (
    <section style={{height: "100%"}}>
        <GoogleMapLoader
            containerElement={<div {...props.contaienrElementProps} style={{height: "100%"}}/>}
            googleMapElement={
                <GoogleMap
                    ref={map => console.log(map)}
                    defaultZoom={3}
                    defaultCenter={{lat: - 25.363882, lng: 131.044922}}
                    onClick={props.onMapClick}>
                    {props.markers.map((marker, index) => (
                        <Marker {...marker} onRightclick={() => props.OnMarkerRightclick(index)} />
                    ))}
                </GoogleMap>
            }/>
    </section>
);

export default SimpleMap;