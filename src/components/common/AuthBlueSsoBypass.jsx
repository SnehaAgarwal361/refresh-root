import React from 'react';
import PropTypes from 'prop-types';

export default function AuthBlueSsoBypass({ children }) {
  AuthBlueSsoBypass.propTypes = {
    children: PropTypes.node,
  };
  return (
    <div>
      {children}
    </div>
  );
}

export const mockUseAuthBlueSso = {
  user: {
    attributes: {
      adsId: 'BypassedTestUser',
    },
  },
};
