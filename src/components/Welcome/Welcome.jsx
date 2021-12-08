import React from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import Header from './Header';
import Cards from './Cards';
import Card from './Card';

const Welcome = () => {
  const intl = useIntl();

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'helmet.title' })}</title>
      </Helmet>
      <Header />
      <div className="dls-container">
        <div className="container">
          <div className="flex flex-column flex-justify-center flex-align-center pad-4">
            <h1 className="heading-6"> One App </h1>
            <h2 className="heading-5"> know-your-customer-refresh-root </h2>
          </div>
          <Cards />
          <div className="dls-gray-02-bg pad-responsive">
            <Card titleIntlId="cards.nextSteps.title" bodyIntlIds={['cards.nextSteps.body1']} cardLgCols={null} />
          </div>
        </div>
      </div>
    </>
  );
};

Welcome.propTypes = {};

export default Welcome;
