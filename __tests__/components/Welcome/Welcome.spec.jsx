import React from 'react';
import { shallow } from 'enzyme';
import Welcome from '../../../src/components/Welcome/Welcome';

describe('Welcome should render as expected', () => {
  it('module should render correct JSX', () => {
    const renderedComponent = shallow(<Welcome />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
