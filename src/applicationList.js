export const applicationList = [
  {
    friendlyName: 'Customer Inbound',
    description: 'Customer Inbound interacts with Inbound channels to provide information on customer\'s KYC Refreshes',
    id: 'CIN',
  },
  {
    friendlyName: 'Event Reporting Gateway',
    description: 'Responsible for sending KYC reporting data to the appropriate Enterprise platform',
    id: 'ERG',
  },
  {
    friendlyName: 'Manager',
    description: 'Manager provides an api to read and change the application properties, scheduled jobs and triggers',
    id: 'MGR',
  },
  {
    friendlyName: 'Refresh Workflow Individual',
    description: 'Refresh Workflow Individual decides how and where a refresh should take place',
    id: 'RWI',
  },
  {
    friendlyName: 'Trigger',
    description: 'Trigger decides when a refresh should take place and it initiates a refresh for an eligible Customer.',
    id: 'TRG',
  },
  {
    friendlyName: 'Tracker',
    description: 'Tracker keeps track of the data blocks that need to be refreshed at a customer level',
    id: 'TRK',
  },
  {
    friendlyName: 'Customer Outbound',
    description: 'Customer Outbound allows sending outbound communications to customers',
    id: 'COU',
  },
  {
    friendlyName: 'Timeline',
    description: 'Timeline keeps track of refresh journey of the customer',
    id: 'TML',
  },
  {
    friendlyName: 'Consequences',
    description: 'Responsible for managing HOW Consequence actions are performed for a refresh including any dependencies on previous consequence actions',
    id: 'CNQ',
  },
  {
    friendlyName: 'Business Exception',
    description: 'Responsible for handling business exceptions',
    id: 'BEX',
  },
  {
    friendlyName: 'Timebox',
    description: 'Responsible for queueing actions so that they are executed only within certain timeframe/day-time window defined by market',
    id: 'TBX',
  },
  {
    friendlyName: 'Trigger 2.0',
    description: 'Responsible for handling C360 customer prompting',
    id: 'TG2'
  }
];
