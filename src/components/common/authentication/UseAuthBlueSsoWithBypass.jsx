import { useAuthBlueSso } from 'use-authblue-sso';
import { useSelector } from 'react-redux';

import { mockUseAuthBlueSso } from './AuthBlueSsoBypass';

const useAuthBlueSsoWithBypass = () => {
  const BYPASS_AUTHBLUE_SSO = useSelector(
    (state) => !!state.getIn(['config', 'BYPASS_AUTHBLUE_SSO'])
  );
  const result = useAuthBlueSso();
  if (BYPASS_AUTHBLUE_SSO) {
    return mockUseAuthBlueSso;
  }

  return result;
};

export default useAuthBlueSsoWithBypass;
