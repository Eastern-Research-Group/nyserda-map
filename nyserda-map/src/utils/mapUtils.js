// @flow

import {layerTypes} from '../redux/modules/control';

const mapLayerPrefixes = {
    [layerTypes.EXISTING_MARSH]: 'ExistingMarsh',
    [layerTypes.NEW_COASTAL_MARSH]: 'NewCoastalMarsh',
};

export const zoomRanges = {
    CLOSE: {
        min: 128,
        max: 1024,
    },
    FAR: {
        min: -1,
        max: 1024,
    },
    EVERYTHING: {
        min: -1,
        max: 1024,
    }
};


export function buildLayers ({activeLayers,selectedLayerTypes,selectedYear}) {
    let layers = [];
    if (activeLayers.length !== 0) {
        layers = selectedLayerTypes.map(lt => activeLayers[0].data[mapLayerPrefixes[lt] + selectedYear])
    }

    return layers;
}

export function filterZoomLevel (layers, zoom) {
    if(!zoom) return layers;

    let {min = false, max = false} = zoom;

    const zooms = [];
    console.log('using the zooms:',zoom);

    const filteredLayers = layers.map(layerSet => layerSet.filter(layer => {
        zooms.push(layer.zoomMin + ',' + layer.zoomMax);

        if (min && max) {
            return parseInt(layer.zoomMin,10) === min && parseInt(layer.zoomMax,10) === max;
        }

        if (min) {
            return parseInt(layer.zoomMin,10) === min;
        }

        if (max) {
            return parseInt(layer.zoomMax,10) === max;
        }
    }));

    console.log('zooms',zooms.filter((item, pos) => zooms.indexOf(item) === pos));

    if(layers[0] && layers[1]){
        console.log('Visible layers - Existing',layers[0].length - filteredLayers[0].length);
        console.log('Visible layers - New',layers[1].length - filteredLayers[1].length);
    }


    return filteredLayers
}
