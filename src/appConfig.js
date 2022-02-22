import csp from './csp';

export default {
  csp,
  provideStateConfig: {
    oneDataApiUrl: {
      client: {
        e1: 'https://functions-dev.aexp.com',
        e2: 'https://functions-qa.aexp.com',
        e3: 'https://functions.aexp.com',
      },
      server: {
        e1: '[Insert One Data E1 URL]',
        e2: '[Insert One Data E2 URL]',
        e3: '[Insert One Data E3 URL]',
      },
    },
  },
};
