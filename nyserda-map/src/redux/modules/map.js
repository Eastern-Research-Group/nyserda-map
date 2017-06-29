import * as fromControl from './control';
import * as fromLayers from './layers';
export const CHANGE_VIEW = 'nyserda/map/CHANGE_VIEW';
export const CHANGE_ZOOM = 'nyserda/map/CHANGE_ZOOM';

const defaultViews = {
    default: {lat: 40.7993, lng: -73.6853, zoom: 10},
    nassau: {lat: 40.7202, lng: -73.6208, zoom: 11},
    nyc: {lat: 40.6983, lng: -73.9490, zoom: 11},
    westchester: {lat: 40.9314, lng: -73.7394, zoom: 13},
};

export const initialState = {
    lat: defaultViews.default.lat,
    lng: defaultViews.default.lng,
    zoom: defaultViews.default.zoom,
};

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case CHANGE_VIEW:
            return {
                ...state,
                lat: action.payload.lat,
                lng: action.payload.lng,
                zoom: action.payload.zoom,
            };

        case fromControl.SELECT_AREA:
            const view = defaultViews[action.payload.value];
            return {
                ...state,
                lat: view.lat,
                lng: view.lng,
                zoom: view.zoom,
            };

        case fromLayers.SELECT_LAYER:
            return state;

        case CHANGE_ZOOM:
            return {
                ...state,
                zoom: action.payload.zoom,
            };

        default:
            return state;
    }
}

export const getCoordinates = (state) => [state.map.lat, state.map.lng];
export const getZoom = state => state.map.zoom;

export const changeView = (lat, lng, zoom) => ({
    type: CHANGE_VIEW,
    payload: {
        lat,
        lng,
        zoom,
    }
});

export const changeZoom = (zoom) => ({
    type: CHANGE_ZOOM,
    payload: {
        zoom,
    }
});
