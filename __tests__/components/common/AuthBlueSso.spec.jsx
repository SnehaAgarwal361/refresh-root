import React from 'react';
import '@testing-library/jest-dom';
import { renderAuthBlueSso } from '../../__utils__/renderWithAuthblue';

// -- Begin Tests -- //
describe('Should render as expected', () => {
  it('Renders AuthBlueProvider', () => {
    const { mocks } = renderAuthBlueSso(<p>Hello World!</p>);
    expect(mocks.authBlueProviderMock).toBeCalledTimes(1);
    expect(mocks.authBlueSsoBypassMock).not.toBeCalled();
  });

  it('Renders AuthBlueSsoBypass', () => {
    const { mocks } = renderAuthBlueSso(<p>Hello World!</p>, ['config', 'BYPASS_AUTHBLUE_SSO', true]);

    expect(mocks.authBlueSsoBypassMock).toBeCalledTimes(1);
    expect(mocks.authBlueProviderMock).not.toBeCalled();
  });
});
