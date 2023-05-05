import React from 'react';
import Home from '../../src/components/Home';
import { renderAuthBlueSso } from '../__utils__/renderWithAuthblue';

describe('Should render as expected', () => {
  it('Display home screen as expected', () => {
    const { renderResult } = renderAuthBlueSso(<Home />, ['config', 'BYPASS_AUTHBLUE_SSO', true]);
    expect(renderResult.container.firstChild)
      .toMatchSnapshot();
  });
});
