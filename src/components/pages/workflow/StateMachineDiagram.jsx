import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import mermaid from 'mermaid';
import PropTypes from 'prop-types';
import { UpdateTransitionModal } from './UpdateTransitionModal';
import { mapToChart } from './SvgContainerFunctions';

export function StateMachineDiagram({ applicationName, transitions }) {
  const [selectedTransition, setSelectedTransition] = useState('');
  const [state, setState] = useState(false);
  const toggleModal = useCallback(() => setState({ show: !state.show }), [state.show]);
  const addClickListeners = useCallback((trans) => {
    const edges = document.querySelectorAll('.edgeLabel');
    edges.forEach((edge) => {
      edge.addEventListener('click', () => {
        const identifier = `${edge.querySelector('title')
          .textContent
          .trim()}`;
        const sTransition = trans.filter((transition) => transition.guid === identifier);
        if (sTransition.length > 0) {
          setSelectedTransition(sTransition[0]);
          toggleModal();
        }
      });
    });
  }, [toggleModal]);

  const svgContainer = useRef('');
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      useMaxWidth: true,
      htmlLabels: true,
    });
  }, [transitions, addClickListeners]);

  useEffect(() => {
    if (transitions && transitions.length === 0) return;
    const mmd = mapToChart(transitions);
    mermaid.mermaidAPI.render('state-machine', mmd, (result) => {
      svgContainer.current.innerHTML = result;
    });
    addClickListeners(transitions);
  }, [transitions, addClickListeners]);
  return (
    <>
      <div id="container" data-testid="container" ref={svgContainer} />
      {state.show && (
        <UpdateTransitionModal
          selectedTransition={selectedTransition}
          toggleModal={toggleModal}
          applicationName={applicationName}
        />
      )}
    </>
  );
}

StateMachineDiagram.propTypes = {
  applicationName: PropTypes.string,
  transitions: PropTypes.arrayOf(
    PropTypes.shape({
      version: PropTypes.number,
      lastUpdatedUserId: PropTypes.string,
      lastUpdatedSource: PropTypes.string,
      guid: PropTypes.string,
      strategy: PropTypes.string,
      superStateName: PropTypes.string,
      stateName: PropTypes.string,
      eventType: PropTypes.string,
      nextSuperStateName: PropTypes.string,
      nextStateName: PropTypes.string,
      actionName: PropTypes.string,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
      active: PropTypes.bool,
    })),
};
