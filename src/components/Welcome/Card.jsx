import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Anchor } from '@americanexpress/dls-react';

const Card = ({
  titleIntlId, bodyIntlIds, linkUrl, linkTextIntlId, cardLgCols,
}) => (
  <div className={cardLgCols ? `col-md-12 col-lg-${cardLgCols}` : ''}>
    <div className="card card-relative pad-responsive">
      <div className="pad-responsive">
        <h1 className="heading-5 dls-gray-05">
          <FormattedMessage id={titleIntlId} />
        </h1>
      </div>
      {
        bodyIntlIds.map((bodyIntlId) => (
          <Fragment key={bodyIntlId}>
            <hr />
            <div className="pad-responsive">
              <p className="body-1 dls-gray-05 pad-r-1">
                <FormattedMessage id={bodyIntlId} />
              </p>
            </div>
          </Fragment>
        ))
      }
      {
        linkUrl && linkTextIntlId
        && (
          <div className="pad-responsive">
            <Anchor target="_blank" rel="noopener noreferrer" href={linkUrl}>
              <FormattedMessage id={linkTextIntlId} />
            </Anchor>
          </div>
        )
      }
    </div>
  </div>
);

Card.propTypes = {
  titleIntlId: PropTypes.string.isRequired,
  bodyIntlIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  linkUrl: PropTypes.string,
  linkTextIntlId: PropTypes.string,
  cardLgCols: PropTypes.number,
};

Card.defaultProps = {
  cardLgCols: 4,
  linkUrl: undefined,
  linkTextIntlId: undefined,
};

export default Card;
