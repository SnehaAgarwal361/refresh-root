import React from 'react';
import PropTypes from 'prop-types';

export default function AuthBlueSsoBypass({ children }) {
  AuthBlueSsoBypass.propTypes = {
    children: PropTypes.node,
  };
  return (
  // eslint-disable-next-line react/jsx-no-useless-fragment -- Fragment is used to wrap children
    <>
      {children}
    </>
  );
}

export const mockUseAuthBlueSso = {
  user: {
    attributes: {
      adsId: 'BypassedTestUser',
    },
  },
  urls: {
    getLogoffUrl: () => 'https://ssoisvc-dev.aexp.com/ssoi/logoff?channel=use-authblue-sso@1.2.2',
  },
};
