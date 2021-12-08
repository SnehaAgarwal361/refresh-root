import React from 'react';
import oneAppModuleWrapper from '@americanexpress/one-app-module-wrapper';
import { IntlProvider } from 'react-intl';
import { loadLanguagePack } from '@americanexpress/one-app-ducks';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import childRoutes from '../childRoutes';
import Welcome from './Welcome/Welcome';

const KYCRefreshRoot = ({ languageData, locale }) => Object.entries(languageData).length > 0 && (
<IntlProvider locale={locale} messages={languageData}>
  <Helmet
    link={[
      {
        rel: 'stylesheet', // TODO: we should generate the below line to use the same version of dls as was installed
        href: 'https://www.aexp-static.com/cdaas/one/statics/axp-dls/6.18.1/package/dist/6.18.1/styles/dls.min.css',
      },
    ]}
  />
  <Welcome />
</IntlProvider>
);

export const TestableKnowYourCustomerRefreshRoot = KYCRefreshRoot;

KYCRefreshRoot.propTypes = {
  languageData: PropTypes.shape({}).isRequired, // no need to restate all the keys in the lang pack
  locale: PropTypes.string.isRequired,
};

// Read about childRoutes:
// https://github.com/americanexpress/one-app/blob/main/docs/api/modules/Routing.md#childroutes
KYCRefreshRoot.childRoutes = childRoutes;

// Read about appConfig:
// https://github.com/americanexpress/one-app/blob/main/docs/api/modules/App-Configuration.md
/* istanbul ignore next */
if (!global.BROWSER) {
  // eslint-disable-next-line global-require -- require needs to be inside browser check
  KYCRefreshRoot.appConfig = require('../appConfig').default;
}

export const loadModuleData = ({ store: { dispatch } }) => dispatch(loadLanguagePack('know-your-customer-refresh-root', { fallbackLocale: 'en-US' }));

KYCRefreshRoot.holocron = {
  name: 'know-your-customer-refresh-root',
  loadModuleData,
};

export default oneAppModuleWrapper('know-your-customer-refresh-root')(KYCRefreshRoot);
