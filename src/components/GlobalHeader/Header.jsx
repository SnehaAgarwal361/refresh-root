import React from 'react';
import { withRouter } from '@americanexpress/one-app-router';
import {
  OverflowMenuNavigation,
  OverflowMenu,
  dlsBrightBlue,
  IconHome,
  IconSetting,
  IconTime,
  IconActivity,
  IconAccount,
} from '@americanexpress/dls-react';
import { FormattedMessage } from 'react-intl';

const Header = ({push}) => (
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
    </div>
    <div className="flex flex-justify-between pad-1">
      <OverflowMenu id="overflowmenu-right-instance" label="basic menu">
        <OverflowMenuNavigation onClick={() => push('/home')}>
          <IconHome theme={dlsBrightBlue} className="pad-1" />
          <FormattedMessage id="menu.home" />
        </OverflowMenuNavigation>
        <OverflowMenuNavigation onClick={() => push('/application-properties')}>
          <IconSetting theme={dlsBrightBlue} className="pad-1" />
          <FormattedMessage id="menu.application.properties" />
        </OverflowMenuNavigation>
        <OverflowMenuNavigation onClick={() => push('/quartz')}>
          <IconTime theme={dlsBrightBlue} className="pad-1" />
          <FormattedMessage id="menu.quartz" />
        </OverflowMenuNavigation>
        <OverflowMenuNavigation onClick={() => push('/workflow-visualization')}>
          <IconActivity theme={dlsBrightBlue} className="pad-1" />
          <FormattedMessage id="menu.workflow.visualization" />
        </OverflowMenuNavigation>
        <OverflowMenuNavigation onClick={() => push('/logout')}>
          <IconAccount theme={dlsBrightBlue} className="pad-1" />
          <FormattedMessage id="menu.Logout" />
        </OverflowMenuNavigation>
      </OverflowMenu>
    </div>
  </header>
);

Header.propTypes = {};

export default Header;
