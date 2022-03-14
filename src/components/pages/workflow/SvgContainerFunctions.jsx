export function mapToChart(transitions = []) {
  let st = '';
  const flow = [];
  if (transitions && transitions.length > 0) {
    const stateMachineString = 'stateDiagram-v2 \n';
    transitions
      .forEach(
        (transition) => {
          const from = transition.stateName;
          const to = transition.nextStateName;
          const eventAction = `${transition.eventType} \\n ${transition.actionName} <title>${transition.guid}</title>`;
          flow.push(`${from} --> ${to} : ${eventAction}`);
        }
      );
    st = stateMachineString.concat(flow.join('\n'));
  }
  return st;
}
