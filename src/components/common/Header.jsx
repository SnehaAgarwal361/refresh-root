import React from 'react';

const Header = () => (
  <header
    id="dls-nav"
    className="nav nav-large nav-horizontal nav-header dls-bright-blue-bg dls-white"
    role="banner"
  >
    <div className="nav-brand pad-l">
      <img
        src="https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/2.24.1/package/dist/img/logos/dls-logo-line-white.svg"
        alt="American Express"
      />
    </div>
    <div className="overflow-menu margin-r" data-toggle="overflowmenu">
      <button
        type="button"
        id="overflow1"
        aria-labelledby="overflow-button"
        className="icon dls-icon-list dls-white"
        aria-haspopup="false"
        aria-expanded="false"
      />
      <ul className="border" aria-labelledby="overflow1">
        <li>
          <a href="/application-properties" className="display-block icon-hover">
            <span className="icon icon-sm dls-icon-setting" />
            <span className="pad-1-l">Application Properties</span>
          </a>
        </li>
        <li>
          <a href="/quartz" className="display-block icon-hover">
            <span className="icon icon-sm dls-icon-time" />
            <span className="pad-1-l">Quartz</span>
          </a>
        </li>
        <li>
          <a href="/workflow-visualization" className="display-block icon-hover">
            <span className="icon icon-sm dls-icon-activity" />
            <span className="pad-1-l">Workflow Visualization</span>
          </a>
        </li>
        <li>
          <a href="/logout" className="display-block icon-hover">
            <span className="icon icon-sm dls-icon-airplane" />
            <span className="pad-1-l">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
