import {connect} from 'react-redux';
import Control from './Control';
import {
    getArea,
    getYears,
    getSelectedYear,
    getSelectedLayerTypes,
} from '../../redux/modules/reducer';
import {
    selectArea,
    selectYear,
    selectLayerType,
} from '../../redux/modules/control';

const mapStateToProps = state => ({
    area: getArea(state),
    years: getYears(state),
    selectedYear: getSelectedYear(state),
    selectedLayerTypes: getSelectedLayerTypes(state),
});

const mapDispatchToProps = dispatch => ({
    onSelectArea(e) {
        dispatch(selectArea(e.target.value));
    },
    onChangeSlider(value) {
        dispatch(selectYear(value));
    },
    onSelectLayerType(e) {
        const {value, checked} = e.target;
        dispatch(selectLayerType(value, checked));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Control)