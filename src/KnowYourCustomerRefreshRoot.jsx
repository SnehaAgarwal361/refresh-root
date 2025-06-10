import React from 'react';
import oneAppModuleWrapper from '@americanexpress/one-app-module-wrapper';
import { IntlProvider } from 'react-intl';
import { loadLanguagePack } from '@americanexpress/one-app-ducks';
import PropTypes from 'prop-types';
import childRoutes from './childRoutes';
import { DLSStyle } from './components/common/authentication/DLSStyle';
import Header from './components/common/header/Header';
import { AuthBlueSso } from './components/common/authentication/AuthBlueSso';
import styles from './components/pages/Pages.scss';

const KnowYourCustomerRefreshRoot = ({ languageData, locale, children }) => (
  <AuthBlueSso>
    <IntlProvider locale={locale} messages={languageData}>
      <DLSStyle version="6.18.1" />
      <Header />
      <div className={styles.bg_img}>
        {children}
      </div>
    </IntlProvider>
  </AuthBlueSso>
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
  KnowYourCustomerRefreshRoot.appConfig = require('./config/appConfig').default;
}

export const loadModuleData = ({ store: { dispatch } }) => dispatch(loadLanguagePack('know-your-customer-refresh-root', { fallbackLocale: 'en-US' }));

KnowYourCustomerRefreshRoot.holocron = {
  name: 'know-your-customer-refresh-root',
  loadModuleData,
};

export default oneAppModuleWrapper('know-your-customer-refresh-root')(KnowYourCustomerRefreshRoot);
