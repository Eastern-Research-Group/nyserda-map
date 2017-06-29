import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import Control from './Control';

function setup () {
    const props = {
        area: 'nyc',
        years: [2017],
        selectedYear: '',
        selectedLayerTypes: [],
        onSelectArea: jest.fn(),
        onChangeSlider: jest.fn(),
        onSelectLayerType: jest.fn(),
    };

    const enzymeWrapper = shallow(<Control {...props}/>);

    return {
        props,
        enzymeWrapper,
    };
}

describe('<Control />', () => {
    it('renders without crashing', () => {
        const {props} = setup();
        const component = shallow(<Control {...props}/>);
    });
});