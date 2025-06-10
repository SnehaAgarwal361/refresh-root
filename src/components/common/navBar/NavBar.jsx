import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavBar.scss';

const NavBar = ({ section, setSection }) => (
  <div className={styles.navbar}>
    <nav className="nav nav-horizontal nav-large" data-toggle="nav" data-responsive="md">
      <ul className="nav-menu">
        <li className="nav-item">
          <button type="button" onClick={() => setSection('applicationProperties')} className="nav-link" aria-current={section === 'applicationProperties' ? 'page' : 'false'}>Application Properties</button>
        </li>
        <li className="nav-item">
          <button type="button" onClick={() => setSection('quartz')} className="nav-link" aria-current={section === 'quartz' ? 'page' : 'false'}>Quartz Job Properties</button>
        </li>
      </ul>
    </nav>
  </div>
);

export default NavBar;

NavBar.propTypes = {
  section: PropTypes.string,
  setSection: PropTypes.func.isRequired,
};
