import * as fromLayers from './layers';

export const SELECT_AREA = 'nyserda/control/SELECT_AREA';
export const SELECT_CATEGORY = 'nyserda/control/SELECT_CATEGORY';
export const SELECT_YEAR = 'nyserda/control/SELECT_YEAR';
export const SELECT_LAYER_TYPE = 'nyserda/control/SELECT_LAYER_TYPE';

export const layerTypes = {
    EXISTING_MARSH: 'EXISTING_MARSH',
    NEW_COASTAL_MARSH: 'NEW_COASTAL_MARSH',
};

export const initialState = {
    area: '',
    categories: [],
    selectedCategories: [],
    years: [],
    selectedYear: 0,
    selectedLayerTypes: Object.keys(layerTypes),
};

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case SELECT_AREA:
            return {
                ...state,
                area: action.payload.value
            };

        case fromLayers.SELECT_LAYER:
            let years = action.payload.categories.filter(c => c.indexOf('ExistingMarsh') !== -1).map(c => parseInt(c.replace('ExistingMarsh',''),10))
            return {
                ...state,
                categories: action.payload.categories,
                years: years,
                selectedYear: years[0]
            };

        case SELECT_CATEGORY:
            if (action.payload.checked) {
                return {
                    ...state,
                    selectedCategories: [
                        ...state.selectedCategories,
                        action.payload.id,
                    ],
                };
            }

            return {
                ...state,
                selectedCategories: state.selectedCategories.filter(c => c !== action.payload.id)
            };

        case SELECT_YEAR:
            if(state.years.length === 0) return state;
            const selectedYear = state.years.reduce((prev, current) => Math.abs(current - action.payload.year) < Math.abs(prev - action.payload.year) ? current : prev);
            return {
                ...state,
                selectedYear: selectedYear
            };

        case SELECT_LAYER_TYPE:
            if(action.payload.checked) {
                return {
                    ...state,
                    selectedLayerTypes: [
                        ...state.selectedLayerTypes,
                        action.payload.id,
                    ]
                }
            }

            return {
                ...state,
                selectedLayerTypes: state.selectedLayerTypes.filter(l => l !== action.payload.id)
            };

        default:
            return state;
    }
}

export const getArea = state => state.control.area;
export const getCategories = state => state.control.categories;
export const getSelectedCategories = state => state.control.selectedCategories;
export const getYears = state => state.control.years;
export const getSelectedYear = state => state.control.selectedYear;
export const getSelectedLayerTypes = state => state.control.selectedLayerTypes;

export const selectArea = value => dispatch => {
    dispatch(fromLayers.addLayerIfNeeded(value));

    return dispatch({
        type: SELECT_AREA,
        payload: {
            value
        }
    });
};

export const selectCategory = (id, checked) => ({
    type: SELECT_CATEGORY,
    payload: {
        id,
        checked
    }
});

export const selectYear = year => ({
    type: SELECT_YEAR,
    payload: {
        year
    }
});

export const selectLayerType = (id, checked) => ({
    type: SELECT_LAYER_TYPE,
    payload: {
        id,
        checked
    }
});