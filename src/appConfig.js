import { timeoutBrowserLikeFetch } from '@americanexpress/browser-like-fetch';
import csp from './csp';

/*
 * This is the URL needed by axp-intranet-identity for calling One Data calls
 */
const oneDataApiUrls = {
  e1: 'https://functions-dev.aexp.com',
  e2: 'https://functions-qa.aexp.com',
  e3: 'https://functions.aexp.com',
};

/*
 * This is the URL needed by axp-intranet-identity for redirecting to AuthBlue Login pages
 * when a session is not valid
 */
const authblueLoginBaseUrls = {
  e1: 'https://ssoisvc-dev.aexp.com',
  e2: 'https://authbluesvcqa-vip.phx.aexp.com',
  e3: 'https://authbluesvc.aexp.com',
};

/*
 * This is the URL needed by axp-intranet-identity for redirecting to AuthBlue Logout pages
 * when a session is not valid
 */
const authblueLogoutBaseUrls = {
  e1: 'https://ssoisvc-dev.aexp.com/ssoi/logoff',
  e2: 'https://authbluesvcqa-vip.phx.aexp.com/ssoi/logoff',
  e3: 'https://authbluesvc.aexp.com/ssoi/logoff',
};

/*
 * This is the URL needed by axp-intranet-identity for redirecting to AuthBlue Tenancy which
 * is responsible for converting the bluetoken cookie into an aat token
 */
const intranetIdentityBaseUrls = {
  e1: 'https://identity-dev.aexp.com',
  e2: 'https://identity-qa.aexp.com',
  e3: 'https://identity.aexp.com',
};

export default {
  csp,
  createSsrFetch: timeoutBrowserLikeFetch(),
  provideStateConfig: {
    oneDataApiUrl: {
      client: oneDataApiUrls,
      server: oneDataApiUrls,
    },
    authblueLoginBaseUrl: {
      client: authblueLoginBaseUrls,
      server: authblueLoginBaseUrls,
    },
    authblueLogoutBaseUrl: {
      client: authblueLogoutBaseUrls,
      server: authblueLogoutBaseUrls,
    },
    faasApiUrl: {
      client: oneDataApiUrls,
      server: oneDataApiUrls,
    },
    intranetIdentityBaseUrl: {
      client: intranetIdentityBaseUrls,
      server: intranetIdentityBaseUrls,
    },
    isAuthBlueSsoLoggingEnabled: {
      client: {
        e1: false,
        e2: false,
        e3: false,
      },
      server: {
        e1: false,
        e2: false,
        e3: false,
      },
    },
  },
};
