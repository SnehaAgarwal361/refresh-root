import React from 'react';
import { Route, IndexRedirect } from '@americanexpress/one-app-router';
import Home from './components/Home';
import ApplicationProperties from './components/ApplicationProperties';
import Quartz from './components/Quartz';
import WorkflowVisualization from './components/WorkflowVisualization';
import Logout from './components/Logout'
import {  
  homeRoute,
  applicationPropertiesRoute,
  quartzRoute,
  workflowVisualizationRoute,
  logoutRoute,
} from './constants';

const childRoutes = () => [
  <Route path={homeRoute} component={Home} />,
  <Route path={applicationPropertiesRoute} component={ApplicationProperties} />,
  <Route path={quartzRoute} component={Quartz} />,
  <Route path={workflowVisualizationRoute} component={WorkflowVisualization} />,
  <Route path={logoutRoute} component={Logout} />
];

export default childRoutes;
