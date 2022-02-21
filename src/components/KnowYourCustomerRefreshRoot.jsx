import React from 'react';
import { compose } from 'redux';
import oneAppModuleWrapper from '@americanexpress/one-app-module-wrapper';
import { IntlProvider } from 'react-intl';
import { loadLanguagePack } from '@americanexpress/one-app-ducks';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from '@americanexpress/one-app-router';
import childRoutes from '../childRoutes';
import Header from './GlobalHeader/Header';

const KYCRefreshRoot = ({
  languageData,
  locale,
  router,
  children,
}) => Object.entries(languageData).length > 0 && (
<IntlProvider locale={locale} messages={languageData}>
  <Helmet
    link={[
      {
        rel: 'stylesheet',
        href: 'https://www.aexp-static.com/cdaas/one/statics/axp-dls/6.18.1/package/dist/6.18.1/styles/dls.min.css',
      },
    ]}
  />
  <Header push={router.push} />
  {children}
</IntlProvider>
);

export const TestableKnowYourCustomerRefreshRoot = KYCRefreshRoot;

KYCRefreshRoot.propTypes = {
  languageData: PropTypes.shape({}).isRequired,
  locale: PropTypes.string.isRequired,
};

KYCRefreshRoot.childRoutes = childRoutes;

if (!global.BROWSER) {
  KYCRefreshRoot.appConfig = require('../appConfig').default;
}

export const loadModuleData = ({ store: { dispatch } }) => dispatch(loadLanguagePack('know-your-customer-refresh-root', { fallbackLocale: 'en-US' }));

KYCRefreshRoot.holocron = {
  name: 'know-your-customer-refresh-root',
  loadModuleData,
};

export default compose(
  oneAppModuleWrapper('know-your-customer-refresh-root'),
  withRouter
)(KYCRefreshRoot);
