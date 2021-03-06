import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    let wrapper;
    it('should render <BuildControls /> when ingredients are present', () => {
        wrapper = shallow(<BurgerBuilder onFetchIngredients={() => {}} onSetAuthRedirect={() => {}} />);
        wrapper.setProps({ ingredients: { salad: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
