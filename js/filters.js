import { clearMarkersOnMap } from './map.js';

const AMOUNT_ADS = 10;

const housingTypeElement = document.querySelector('#housing-type');

export const filterMarkers = (ads) => {
  clearMarkersOnMap(ads.slice(0, AMOUNT_ADS));
  housingTypeElement.addEventListener('change', (evt) => {
    const filtersAds = ads
      .slice()
      .filter((item) => item.offer.type === evt.target.value);
    clearMarkersOnMap(filtersAds.slice(0, AMOUNT_ADS));
  });
};
