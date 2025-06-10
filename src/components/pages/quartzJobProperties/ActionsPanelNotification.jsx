import React from 'react';

import {
  PageLevelMessage,
} from '@americanexpress/dls-react';

const ActionsPanelNotification = () => (
  <PageLevelMessage
    type="neutral"
    defaultShow={true}
    dismissible={true}
    data-testid="actionsNotification"
  >
    <p>
      Use the action buttons to manage quartz job triggers.
      You can fire the job immediately, pause, resume or reset the job and edit the job schedule.
    </p>
  </PageLevelMessage>
);

export default ActionsPanelNotification;
