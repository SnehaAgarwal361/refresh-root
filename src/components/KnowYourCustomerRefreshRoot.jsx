import React, { Fragment } from 'react';
import oneAppModuleWrapper from '@americanexpress/one-app-module-wrapper';
import { IntlProvider } from 'react-intl';
import { loadLanguagePack } from '@americanexpress/one-app-ducks';
import PropTypes from 'prop-types';
import childRoutes from '../childRoutes';
import { DLSStyle } from './common/DLSStyle';
import Header from './common/Header';

const KnowYourCustomerRefreshRoot = ({ languageData, locale, children }) => (
  <IntlProvider locale={locale} messages={languageData}>
    <DLSStyle version="6.18.1" />
    <Header />
    {/* eslint-disable-next-line react/jsx-no-useless-fragment -- Fragment gets popuated later */}
    <Fragment>{children}</Fragment>
  </IntlProvider>
);

export const TestableKnowYourCustomerRefreshRoot = KnowYourCustomerRefreshRoot;

KnowYourCustomerRefreshRoot.propTypes = {
  children: PropTypes.node,
  languageData: PropTypes.shape({}).isRequired, // no need to restate all the keys in the lang pack
  locale: PropTypes.string.isRequired,
};

KnowYourCustomerRefreshRoot.childRoutes = childRoutes;

/* istanbul ignore next */

if (!global.BROWSER) {
  // eslint-disable-next-line global-require -- require needs to be inside browser check
  KnowYourCustomerRefreshRoot.appConfig = require('../appConfig').default;
}

export const loadModuleData = ({ store: { dispatch } }) => dispatch(loadLanguagePack('know-your-customer-refresh-root', { fallbackLocale: 'en-US' }));

KnowYourCustomerRefreshRoot.holocron = {
  name: 'know-your-customer-refresh-root',
  loadModuleData,
};

export default oneAppModuleWrapper('know-your-customer-refresh-root')(KnowYourCustomerRefreshRoot);
