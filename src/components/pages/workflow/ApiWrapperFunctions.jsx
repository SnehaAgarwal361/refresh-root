import { FetchStrategies, FetchTransitions, UpdateTransition } from './ApiFunctions';
import { applicationList } from '../../../applicationList';

export function FetchWorkflowStrategies() {
  const strategyList = [];
  applicationList
    .filter((app) => app.isEngineImplementation === true)
    .sort()
    .forEach((app) => {
      const { data } = FetchStrategies(app.id);
      if (data && data.status === 200 && data.body) {
        data.body.forEach((strategy) => strategyList.push({
          applicationName: app.id,
          shortName: app.id,
          strategy,
        }));
      } else if (data && data.body) {
      //  console.log(data.body.error);
      }
    });
  return strategyList;
}

export function FetchWorkflowTags(applicationName = '', strategyName = '') {
  const tagSet = new Set();
  const { data } = FetchTransitions(applicationName, strategyName);
  if (data && data.status === 200 && data.body) {
    data.body.map((transition) => transition.tags)
      .filter((tags) => tags.length > 0)
      .reduce((flattened, tags) => [...flattened, ...tags], [])
      .forEach((tag) => tagSet.add(tag.name));
  } else if (data && data.body) {
  //  console.log(data.body.error);
  }
  return [...tagSet];
}

export function FetchStateMachine(applicationName = '', strategyName = '', selectedTags = []) {
  const { data } = FetchTransitions(applicationName, strategyName);
  if (data && data.status === 200 && data.body) {
    const transitions = data.body;
    if (selectedTags && selectedTags.length > 0) {
      return transitions
        .filter((transition) => transition.tags.some((tag) => selectedTags.indexOf(tag.name) > -1));
    }
    return transitions;
  }
  if (data && data.body) {
    // console.log(data.body.error);
  }
  return [];
}

export function UpdateTagsFunction(applicationName, transition, newTags) {
  const transitionWithUpdatedTags = transition;
  transitionWithUpdatedTags.tags = newTags;
  return UpdateTransition(applicationName, transitionWithUpdatedTags);
}
