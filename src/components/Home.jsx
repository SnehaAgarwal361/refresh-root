import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import styles from './styles.scss';

const Home = () => {
  const adsId = useSelector((state) => state.getIn(['modules', 'axp-intranet-identity', 'profile', 'uid']));
  return (
    <main className="flex flex-column">
      <div className={`${styles.kycMainLogo}`}>
        {/* <img src="../assets/final-logo.png" /> */}
        <title>{adsId}</title>
      </div>
      <div className="heading-5 dls-bright-blue margin-center"><FormattedMessage
        id="HomePageBodyHeader"
      />
      </div>
    </main>
  );
};

export default Home;
