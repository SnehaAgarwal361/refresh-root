import React from 'react';
import { Route } from '@americanexpress/one-app-router';
import Home from './components/Home';
import ApplicationProperties from './components/pages/applicationProperties/ApplicationProperties';
import { Quartz } from './components/pages/quartz/Quartz';
import { applicationPropertiesRoute, quartzRoute } from './constants';

const childRoutes = () => [
  // eslint-disable-next-line react/jsx-key -- Key not require
  <Route path="/" component={Home} />,
  <Route
    key={applicationPropertiesRoute}
    path={applicationPropertiesRoute}
    component={ApplicationProperties}
  />,
  <Route key={quartzRoute} path={quartzRoute} component={Quartz} />,
];

export default childRoutes;
