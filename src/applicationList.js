export const applicationList = [
  {
    friendlyName: 'Customer Inbound',
    description: 'Customer Inbound interacts with Inbound channels to provide information on customer\'s KYC Refreshes',
    isEngineImplementation: true,
    id: 'CIN',
  },
  {
    friendlyName: 'Event Reporting Gateway',
    description: 'Responsible for sending KYC reporting data to the appropriate Enterprise platform',
    isEngineImplementation: true,
    id: 'ERG',
  },
  {
    friendlyName: 'Manager',
    description: 'Manager provides an api to read and change the application properties, scheduled jobs and triggers',
    isEngineImplementation: true,
    id: 'MGR',
  },
  {
    friendlyName: 'Refresh Workflow Individual',
    description: 'Refresh Workflow Individual decides how and where a refresh should take place',
    isEngineImplementation: true,
    id: 'RWI',
  },
  {
    friendlyName: 'Trigger',
    description: 'Trigger decides when a refresh should take place and it initiates a refresh for an eligible Customer.',
    isEngineImplementation: true,
    id: 'TRG',
  },
  {
    friendlyName: 'Tracker',
    description: 'Tracker keeps track of the data blocks that need to be refreshed at a customer level',
    isEngineImplementation: true,
    id: 'TRK',
  },
];
