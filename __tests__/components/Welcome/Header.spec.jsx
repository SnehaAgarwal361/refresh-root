import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../src/components/Welcome/Header';

describe('Header should render as expected', () => {
  it('module should render correct JSX', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
