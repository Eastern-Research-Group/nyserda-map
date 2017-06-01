import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import Control from './Control';

function setup () {
    const props = {
        example: 'FooBarBaz',
        onChangeExample: jest.fn(),
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
        const component = renderer.create(<Control {...props}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});