import {connect} from 'react-redux';
import Control from './Control';
import {
    getArea,
    getCategories,
    getSelectedCategories,
    getYears,
    getSelectedYear,
    getSelectedLayerTypes,
} from '../../redux/modules/reducer';
import {
    selectArea,
    selectCategory,
    selectYear,
    selectLayerType,
} from '../../redux/modules/control';

const mapStateToProps = state => ({
    area: getArea(state),
    categories: getCategories(state),
    selectedCategories: getSelectedCategories(state),
    years: getYears(state),
    selectedYear: getSelectedYear(state),
    selectedLayerTypes: getSelectedLayerTypes(state),
});

const mapDispatchToProps = dispatch => ({
    onSelectArea(e) {
        dispatch(selectArea(e.target.value));
    },
    onSelectCategory(e) {
        const {value, checked} = e.target;
        dispatch(selectCategory(value, checked));
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