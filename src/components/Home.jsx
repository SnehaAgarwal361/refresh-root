import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useAuthBlueSso } from 'use-authblue-sso';
import styles from './styles.scss';

const Home = () => {
  const { user } = useAuthBlueSso();
  return (
    <main className="flex flex-column">
      <div className={`${styles.kycMainLogo}`}>
        {/* <img src="../assets/final-logo.png" /> */}
        <title>{user.attributes.adsId}</title>
      </div>
      <div className="heading-5 dls-bright-blue margin-center"><FormattedMessage
        id="HomePageBodyHeader"
      />
      </div>
    </main>
  );
};

export default Home;
