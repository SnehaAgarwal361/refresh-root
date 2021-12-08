import React from 'react';
import { shallow } from 'enzyme';
import Card from '../../../src/components/Welcome/Card';

describe('Card should render as expected', () => {
  let props;
  beforeEach(() => {
    props = {
      titleIntlId: 'titleIntlIdMock',
      bodyIntlIds: ['body1IntlIdMock'],
      linkUrl: 'linkUrlMock',
      linkTextIntlId: 'linkTextIntlIdMock',
    };
  });
  it('module should render correct JSX', () => {
    const renderedComponent = shallow(<Card {...props} />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('module should render correct JSX with no columns', () => {
    const renderedComponent = shallow(<Card {...props} cardLgCols={null} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
