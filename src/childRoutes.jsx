import React from 'react';
import { Route } from '@americanexpress/one-app-router';
import ModuleRoute from 'holocron-module-route';
import Home from './components/Home';
import ApplicationProperties from './components/pages/applicationProperties/ApplicationProperties';
import { Quartz } from './components/pages/quartz/Quartz';
import { WorkflowVisualisation } from './components/pages/workflow/WorkflowVisualisation';
import { applicationPropertiesRoute, quartzRoute, workflowVisualizationRoute } from './constants';

const childRoutes = () => [
  // eslint-disable-next-line react/jsx-key -- Key not required
  <ModuleRoute moduleName="axp-intranet-identity">
    <Route path="/" component={Home} />
    <Route
      key={applicationPropertiesRoute}
      path={applicationPropertiesRoute}
      component={ApplicationProperties}
    />
    <Route key={quartzRoute} path={quartzRoute} component={Quartz} />
    <Route
      key={workflowVisualizationRoute}
      path={workflowVisualizationRoute}
      component={WorkflowVisualisation}
    />
  </ModuleRoute>,
];

export default childRoutes;
