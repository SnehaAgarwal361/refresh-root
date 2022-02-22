import React from 'react';
import { Route } from '@americanexpress/one-app-router';
import Home from './components/Home';
import ApplicationProperties from './components/ApplicationProperties';

import {
  homeRoute,
  applicationPropertiesRoute,
} from './constants';

const childRoutes = () => [
  <Route path={homeRoute} component={Home} />,
  <Route path={applicationPropertiesRoute} component={ApplicationProperties} />,
];

export default childRoutes;
