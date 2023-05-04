import { timeoutBrowserLikeFetch } from '@americanexpress/browser-like-fetch';
import csp from './csp';

const oneDataApiUrls = {
  e1: 'https://functions-dev.aexp.com',
  e2: 'https://functions-qa.aexp.com',
  e3: 'https://functions.aexp.com',
};

const clientAndServerConfig = (config) => ({
  client: config,
  server: config,
});

export default {
  csp,
  createSsrFetch: timeoutBrowserLikeFetch(),
  provideStateConfig: {
    oneDataApiUrl: {
      client: oneDataApiUrls,
      server: oneDataApiUrls,
    },
    intranetEnv: clientAndServerConfig({
      e0: 'e0',
      e1: 'e1',
      e2: 'e2',
      e3: 'e3',
    }),
    faasApiUrl: {
      client: oneDataApiUrls,
      server: oneDataApiUrls,
    },
  },
};
