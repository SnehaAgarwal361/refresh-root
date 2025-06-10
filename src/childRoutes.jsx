import React from 'react';
import { Route } from '@americanexpress/one-app-router';
import ApplicationConfigurationsPage from './components/pages/ApplicationConfigurationsPage';

const childRoutes = () => [
  // eslint-disable-next-line react/jsx-key -- Key not require
  <Route key="/" path="/" component={ApplicationConfigurationsPage} />,
];

export default childRoutes;
