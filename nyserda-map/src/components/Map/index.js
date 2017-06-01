import {connect} from 'react-redux';
import Map from './Map';
import {
    getCoordinates,
    getZoom,
    getActiveLayers,
    getSelectedCategories,
    getSelectedLayerTypes,
    getSelectedYear,
} from '../../redux/modules/reducer';

const mapStateToProps = state => ({
    coordinates: getCoordinates(state),
    zoom: getZoom(state),
    activeLayers: getActiveLayers(state),
    selectedCategories: getSelectedCategories(state),
    selectedLayerTypes: getSelectedLayerTypes(state),
    selectedYear: getSelectedYear(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Map)