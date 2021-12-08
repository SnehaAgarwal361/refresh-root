import React from 'react';
import { shallow } from 'enzyme';
import Cards from '../../../src/components/Welcome/Cards';

describe('Cards should render as expected', () => {
  it('module should render correct JSX', () => {
    const renderedComponent = shallow(<Cards />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
