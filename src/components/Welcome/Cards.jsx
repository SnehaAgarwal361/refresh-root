import React from 'react';
import Card from './Card';

const Cards = () => (
  <>
    <div className="dls-gray-02-bg pad-responsive">
      <div className="row stack-sm-down">
        <Card
          titleIntlId="cards.oneApp.title"
          bodyIntlIds={['cards.oneApp.body1', 'cards.oneApp.body2']}
          linkTextIntlId="cards.oneApp.linkText"
          linkUrl="https://one-dev.aexp.com/one-app/developer-guide/"
        />
        <Card
          titleIntlId="cards.oneDLS.title"
          bodyIntlIds={['cards.oneDLS.body1', 'cards.oneDLS.body2']}
          linkTextIntlId="cards.oneDLS.linkText"
          linkUrl="https://one-dev.aexp.com/v1/one-dls/"
        />
        <Card
          titleIntlId="cards.community.title"
          bodyIntlIds={['cards.community.body1', 'cards.community.body2']}
          linkTextIntlId="cards.community.linkText"
          linkUrl="https://aexp-mobile-and-web.slack.com/archives/C4Z5SV0K0"
        />
      </div>
    </div>
  </>
);

Cards.propTypes = {};

export default Cards;
