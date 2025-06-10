import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  adsUserAttributes, AuthBlueProvider, AuthBlueSessionTimeoutModal, OneDataProvider,
} from 'use-authblue-sso';
import AuthBlueSsoBypass from './AuthBlueSsoBypass';

const userAttributesAndGroupsToCollect = {
  attributes: [
    adsUserAttributes.adsId,
  ],
  groups: ['SSO_GG-ADS-Maestro-Refresh-Ui-Users'],
};

export function AuthBlueSso(props) {
  AuthBlueSso.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const BYPASS_AUTHBLUE_SSO = useSelector(
    (state) => !!state.getIn(['config', 'BYPASS_AUTHBLUE_SSO'])
  );
  const intranetEnv = useSelector((state) => state.getIn(['config', 'intranetEnv']));
  const { children } = props;

  if (BYPASS_AUTHBLUE_SSO) {
    return <AuthBlueSsoBypass>{children}</AuthBlueSsoBypass>;
  }

  return (
    <AuthBlueProvider env={intranetEnv} scope={userAttributesAndGroupsToCollect}>
      <OneDataProvider>
        {children}
        <AuthBlueSessionTimeoutModal countdownDurationInMin={3} timeoutDurationInMin={10} />
      </OneDataProvider>
    </AuthBlueProvider>
  );
}
