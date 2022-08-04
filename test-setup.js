require('amex-jest-preset-react/jest-setup');
require('@babel/polyfill');
// require('@testing-library/jest-dom/extend-expect');

// prevents us from needing to mock out content-security-policy lib which requires this to be set
process.env.ONE_CLIENT_CSP_REPORTING_URL = 'https://example.com/_/report/security/csp-violation';
