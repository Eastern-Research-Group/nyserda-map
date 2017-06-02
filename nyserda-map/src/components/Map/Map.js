import React from 'react';
import {Map, TileLayer, ImageOverlay} from 'react-leaflet';
import {layerTypes} from '../../redux/modules/control';
import SearchControl from '../SearchControl';
import './Map.css';


export default props => {

    let layers = [];
    if (props.activeLayers.length !== 0) {
        const layerPrefix = {
            [layerTypes.EXISTING_MARSH]: 'ExistingMarsh',
            [layerTypes.NEW_COASTAL_MARSH]: 'NewCoastalMarsh',
        };

        layers = props.selectedLayerTypes.map(lt => props.activeLayers[0].data[layerPrefix[lt] + props.selectedYear]);
    }

    return (
        <div id="map-container">
            <Map center={props.coordinates} zoom={props.zoom}>
                <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {layers.map((layer, layer_key) => layer.map((sublayer, sublayer_key) => (
                    <ImageOverlay
                        key={`${layer_key}${sublayer_key}`}
                        bounds={sublayer.bounds}
                        url={sublayer.path}/>
                )))}

                <SearchControl/>
            </Map>
        </div>
    );
}
