import {combineReducers} from 'redux';
import map, * as fromMap from './map';
import control, * as fromControl from './control';
import layers, * as fromLayers from './layers';

export default combineReducers({
    map,
    control,
    layers,
});

export const getCoordinates = state => fromMap.getCoordinates(state);
export const getZoom = state => fromMap.getZoom(state);
export const getArea = state => fromControl.getArea(state);
export const getCategories = state => fromControl.getCategories(state);
export const getSelectedCategories = state => fromControl.getSelectedCategories(state);
export const getYears = state => fromControl.getYears(state);
export const getSelectedYear = state => fromControl.getSelectedYear(state);
export const getSelectedLayerTypes = state => fromControl.getSelectedLayerTypes(state);
export const getActiveLayers = state => fromLayers.getActiveLayers(state);
