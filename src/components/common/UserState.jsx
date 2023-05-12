import useAuthBlueSsoWithBypass from './UseAuthBlueSsoWithBypass';

export const useAdsId = () => useAuthBlueSsoWithBypass().user.attributes.adsId;
