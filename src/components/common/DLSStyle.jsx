import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';

export const DLSStyle = ({ version }) => {
  const dlsLink = `https://www.aexp-static.com/cdaas/one/statics/axp-dls/${version}/package/dist/${version}/styles/dls.min.css`;
  const dlsScript = `https://www.aexp-static.com/cdaas/one/statics/axp-dls/${version}/package/dist/${version}/scripts/dls.min.js`;
  return (
    <Helmet
      link={[
        {
          rel: 'stylesheet',
          href: dlsLink,
        },
        {
          rel: 'icon',
          href: 'https://www.americanexpress.com/favicon.ico',
        },
      ]}
    >
      <meta charSet="UTF-8" />
      ,
      <script src={dlsScript} type="text/javascript" />
    </Helmet>
  );
};

DLSStyle.propTypes = {
  version: PropTypes.string.isRequired,
};
