import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './styles.scss';

const Home = () => {

  return (
    <>
    <main className="flex flex-column">
      <div className={`${styles.kycMainLogo}`}>
        {/* <img src="../assets/final-logo.png" /> */}
      </div>
      <div className="heading-5 dls-bright-blue margin-center"><FormattedMessage id="HomePageBodyHeader" /></div>
    </main>
  </>
  );
};

export default Home;
