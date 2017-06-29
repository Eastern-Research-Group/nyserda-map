import nassau from '../../data/Nassau/Nassau.json';
import nyc from '../../data/NewYorkCity/NewYorkCity.json';
import westchester from '../../data/Westchester/Westchester.json';
import L from 'leaflet';

export const ADD_LAYER = 'nyserda/layers/ADD_LAYER';
export const SELECT_LAYER = 'nyserda/layers/SELECT_LAYER';

function layer (state = { name: '', selected: false, json: {} }, action) {
    switch (action.type) {
        case ADD_LAYER:
        return {
            ...state,
            name: action.payload.name,
            json: action.payload.json,
            selected: false,
            categories: action.payload.categories,
            data: action.payload.data,
            layerObj: action.payload.layerObj,
        };

        case SELECT_LAYER:
        if(state.name !== action.payload.name) {
            return {
                ...state,
                selected: false,
            }
        }

        return {
            ...state,
            selected: true,
        };

        default:
        return state;
    }
}

export default function reducer (state = [], action) {
    switch (action.type) {
        case ADD_LAYER:
        return [
        ...state,
        layer(state, action)
        ];

        case SELECT_LAYER:
        return state.map(l => layer(l, action));

        default:
        return state;
    }
};

export const getActiveLayers = state => state.layers.filter(l => l.selected);
export const getLayer = (state, name) => state.layers.filter(l => l.name === name);

export const selectLayer = name => (dispatch,getState) => {
    const layer = getLayer(getState(), name)[0];

    return dispatch({
        type: SELECT_LAYER,
        payload: {
            name,
            categories: layer.categories,
        }
    });
};

export const addLayer = name => dispatch => {
    const layer = {nassau, nyc, westchester};
    const json = layer[name];
    const data = {};
    const layerObj = {};

    const zooms = {};
    const rasterProperties = json.features.map(data => {
        const zoom = data.geometery.lod.split('_');
        if(data.geometery.lod in zooms) {
            zooms[data.geometery.lod] += 1;
        } else {
            zooms[data.geometery.lod] = 0;
        }
        return({
            path: './data' + data.properties.image_overlay,
            bounds: data.geometery.coordinates,
            group: data.properties.group,
            zoomMin: zoom[0],
            zoomMax: zoom[1],
        });
    });

    console.log('lods:',zooms);

    const categories = rasterProperties.map(r => r.group).filter((r, index, array) => array.indexOf(r) === index);
    categories.forEach(category => data[category] = []);
    rasterProperties.forEach(rasterProp => data[rasterProp.group].push(rasterProp));

    categories.forEach(category => {
        layerObj[category] = L.layerGroup(data[category].map(rasterProps => L.imageOverlay(rasterProps.path, rasterProps.bounds)));
    });

    dispatch({
        type: ADD_LAYER,
        payload: {
            name,
            json,
            categories,
            data,
            layerObj,
        }
    });

    return dispatch(selectLayer(name));
};

export const shouldAddLayer = (state, name) => {
    const layer = getLayer(state,name);

    return layer.length === 0;
};

export const addLayerIfNeeded = name => (dispatch, getState) => {
    if(shouldAddLayer(getState(), name)) {
        return dispatch(addLayer(name));
    }

    return dispatch(selectLayer(name));
};