// import React from 'react';
import L from 'leaflet';
import 'leaflet-geocoder-mapzen/';
import 'leaflet-geocoder-mapzen/dist/leaflet-geocoder-mapzen.min.css';
import {MapControl} from 'react-leaflet';


export default class SearchControl extends MapControl {
    componentWillMount () {
        this.leafletElement = L.control.geocoder('mapzen-wNzZaxx');
    }

    createLeafletElement () {

    }
}