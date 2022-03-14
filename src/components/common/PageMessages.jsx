import { PageLevelMessage } from '@americanexpress/dls-react';
import React from 'react';
import PropTypes from 'prop-types';

export function SuccessMessage({
  message,
  setSuccess,
}) {
  if (message !== undefined) {
    return (
      <PageLevelMessage
        type="success"
        filled={true}
        dismissible={true}
        onDismiss={() => setSuccess(undefined)}
      > {message}
      </PageLevelMessage>
    );
  }
  return <div />;
}

SuccessMessage.propTypes = {
  message: PropTypes.string,
  setSuccess: PropTypes.func,
};

export function ErrorMessage({
  message,
  setError,
}) {
  if (message !== undefined) {
    return (
      <PageLevelMessage
        type="warning"
        dismissible={true}
        onDismiss={() => setError && setError(undefined)}
      > {message}
      </PageLevelMessage>
    );
  }
  return <div />;
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  setError: PropTypes.func,
};
