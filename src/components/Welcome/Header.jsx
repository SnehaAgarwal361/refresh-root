import React from 'react';

const Header = () => (
  <header
    id="dls-nav"
    className="nav nav-large nav-horizontal nav-header dls-bright-blue-bg dls-white"
    role="banner"
  >
    <div className="nav-brand container pad-l">
      <img
        src="https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/2.24.1/package/dist/img/logos/dls-logo-line-white.svg"
        alt="American Express"
      />
      <span className="margin-1-l margin-1-r">|</span>
      Welcome to One App
    </div>
  </header>
);

Header.propTypes = {};

export default Header;
