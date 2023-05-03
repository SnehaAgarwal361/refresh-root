import { useAuthBlueSso } from 'use-authblue-sso';

export const useAdsId = () => useAuthBlueSso().user.attributes.adsId;
