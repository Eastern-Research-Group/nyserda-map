import React from 'react';
import {Map, TileLayer, ImageOverlay} from 'react-leaflet';
import SearchControl from '../SearchControl';
import {buildLayers, filterZoomLevel, zoomRanges} from '../../utils';
import './Map.css';

export default props => {
    console.log(props.zoom);
    let zoomRange;
    if (props.zoom > 9) {
        zoomRange = zoomRanges.CLOSE;
    } else {
        zoomRange = zoomRanges.FAR;
    }

    const layers = filterZoomLevel(buildLayers(props), zoomRange);

    return (
        <div id="map-container">
            <Map center={props.coordinates} zoom={props.zoom} onZoom={props.onZoom}>
                {/*Default Leaflet*/}
                {/*<TileLayer*/}
                    {/*url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'*/}
                    {/*attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'*/}

                {/*/>*/}

                {/*ESRI Topo*/}
                {/*<TileLayer*/}
                    {/*url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'*/}
                    {/*attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'*/}

                {/*/>*/}

                {/*ESRI World*/}
                <TileLayer
                    url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
                />

                {/*HERE Hybrid*/}
                {/*<TileLayer*/}
                    {/*url='https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}'*/}
                    {/*attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'*/}

                {/*/>*/}

                {/*<TileLayer*/}
                    {/*url='https://api.mapbox.com/v4/bryanneva.4t0s25mq/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYnJ5YW5uZXZhIiwiYSI6ImNqMzM5dmhsaDAwMm0yd285bzVndDZxd3QifQ.Oz6siae4RyZLdDdTvcjGwA'*/}
                {/*/>*/}

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
