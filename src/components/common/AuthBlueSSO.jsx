import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  adsUserAttributes, AuthBlueProvider, AuthBlueSessionTimeoutModal, OneDataProvider,
} from 'use-authblue-sso';

/**
 * *** NOTICE!! Sample Application Scope ***
 * Please review the scope documentation and make the appropriate changes needed
 * for your application!!!
 *
 * @see https://github.aexp.com/amex-eng/authblue-use-authblue-sso/wiki/
 */
const userAttributesAndGroupsToCollect = {
  attributes: [
    adsUserAttributes.adsId,
  ],
};

export function AuthBlueSso(props) {
  AuthBlueSso.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const intranetEnv = useSelector((state) => state.getIn(['config', 'intranetEnv']));

  const { children } = props;
  return (
    <AuthBlueProvider env={intranetEnv} scope={userAttributesAndGroupsToCollect}>
      <OneDataProvider>
        {children}
        <AuthBlueSessionTimeoutModal countdownDurationInMin={3} timeoutDurationInMin={10} />
      </OneDataProvider>
    </AuthBlueProvider>
  );
}
