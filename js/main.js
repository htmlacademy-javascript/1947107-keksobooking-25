import { similarAds } from './data.js';
import { setMarkersOnMap } from './map.js';
import './form.js';

const generateAds = (amount) => {
  const data = similarAds(amount);

  setMarkersOnMap(data);
};

generateAds(10);
