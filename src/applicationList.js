export const applicationList = [
  {
    friendlyName: 'Admin',
    description: 'Admin functions (healthcheck, card member manager)',
    id: 'ADM',
  },
  {
    friendlyName: 'Customer Account Gateway',
    description: 'Customer Account Gateway provides an API to retrieve account related demographic data',
    id: 'CAG',
  },
  {
    friendlyName: 'Customer Communications Manager',
    description: 'Customer Communications Manager enables refresh through Outbound Channels',
    isEngineImplementation: true,
    id: 'CCM',
  },
  {
    friendlyName: 'Customer Communications Manager2',
    description: 'Improved and refactored version of Customer Communication Manager',
    isEngineImplementation: true,
    id: 'CCM2',
  },
  {
    friendlyName: 'Configuration Manager',
    description: 'Host all configurations properties for the product',
    id: 'CFG',
  },
  {
    friendlyName: 'Customer Online Manager',
    description: 'Provides Refresh search/update access to Inbound Channels via Apigee',
    id: 'COM',
  },
  {
    friendlyName: 'Consequences Manager',
    description: 'Service for managing the workflows around consequences (Suspension and Cancellation) of customers not responding to data refresh requests.',
    isEngineImplementation: true,
    id: 'CQM',
  },
  {
    friendlyName: 'Case Manager',
    description: 'Case Manager for Case Management abstracting the current CLIC interface (OneData) and case monitoring from the other components in the refresh ecosystem',
    isEngineImplementation: true,
    id: 'CSM',
  },
  {
    friendlyName: 'Reporting',
    description: 'Publishes business events to external reporting solution.',
    id: 'REP',
  },
  {
    friendlyName: 'Refresh Gateway',
    description: 'Abstracts SOR specific messages away from Refresh Conductor',
    id: 'RGW',
  },
  {
    friendlyName: 'Third Party Manager',
    description: 'Third Party Manager handles communication with third party organisations, initially handling validation of demographic data via third party credit reference agencies',
    isEngineImplementation: true,
    id: 'TPM',
  },
  {
    friendlyName: 'Trigger Manager',
    description: 'Trigger manager is responsible for triggering Refresh Requests to the SOR for refresh',
    id: 'TRM',
  },
  {
    friendlyName: 'Workflow Conductor Card',
    description: 'Card based Refresh Workflow Conductor',
    isEngineImplementation: true,
    id: 'WCD',
  },
  {
    friendlyName: 'Workflow Conductor Servicing',
    description: 'Workflow Conductor for managing card member demographics based on externally retrieved customer level information.',
    isEngineImplementation: true,
    id: 'WCN',
  },
  {
    friendlyName: 'Workflow Conductor ID Doc',
    description: 'Workflow Conductor for refreshing customers by ensuring that they provide suitable documentation as proof of identity.',
    isEngineImplementation: true,
    id: 'WID',
  },
  {
    friendlyName: 'Workflow Conductor Data Push',
    description: 'Workflow Conductor for sending latest customer demographic information maintained by Amex to compliance regulators.',
    isEngineImplementation: true,
    id: 'WDP',
  },
  {
    friendlyName: 'Workflow Conductor Customer',
    description: 'Workflow Conductor for refreshing customer data',
    isEngineImplementation: true,
    id: 'WCU',
  },
  {
    friendlyName: 'Customer Inbound',
    description: 'Manage online customers who are eligible for refresh using any Inbound channels',
    isEngineImplementation: false,
    id: 'CIN',
  },
];
