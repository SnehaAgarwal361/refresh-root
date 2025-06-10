import React from 'react';

import useAuthBlueSsoWithBypass from '../authentication/UseAuthBlueSsoWithBypass';
import styles from './Header.scss';

const Header = () => {
  const { urls } = useAuthBlueSsoWithBypass();
  const logoutUrl = urls.getLogoffUrl();
  return (
    <header
      id="header_id"
      className="nav nav-large nav-horizontal nav-header dls-white-bg dls-white"
      role="banner"
    >
      <div className="nav-brand pad-l">
        <div className="height-full">
          <img
            src="https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/2.24.1/package/dist/img/logos/dls-logo-bluebox-alt.svg"
            alt="American Express"
          />
        </div>
        <div className="heading-5 margin-2 dls-bright-blue font-weight-normal">
          Maestro Configuration Manager
        </div>
      </div>
      <div className="pad-r">
        <a href={logoutUrl} className="display-block icon-hover" data-testid="logoutLink">
          <span className={styles.logout}>Logout</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
