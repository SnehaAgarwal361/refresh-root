import { useSelector } from 'react-redux';

export const useAdsId = () => useSelector((state) => state.getIn(['modules', 'axp-intranet-identity', 'profile', 'uid']));
