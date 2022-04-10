import { clearMarkersOnMap, addMarkersOnMap } from './map.js';
import { debounce } from './util.js';

const AMOUNT_ADS = 10;
const RERENDER_DELAY = 500;
let ADS = null;

const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const housingFeaturesElement = document.querySelectorAll('.map__checkbox');

export const saveData = (ads) => {
  ADS = ads;
};

export const filterMarkers = (ads) => {
  const typeValue = housingTypeElement.value;
  const priceValue = housingPriceElement.value;
  const roomsValue = housingRoomsElement.value;
  const guestsValue = housingGuestsElement.value;

  const fiilteredAds = ads
    .slice()
    .filter((item) => {
      if (typeValue === 'any') {
        return item;
      }

      return item.offer.type === typeValue;
    })
    .filter((item) => {
      if (roomsValue === 'any') {
        return item;
      }

      return item.offer.rooms === +roomsValue;
    })
    .filter((item) => {
      if (priceValue === 'any') {
        return item;
      }
      if (priceValue === 'middle') {
        return item.offer.price >= 10000 && item.offer.price <= 50000;
      }
      if (priceValue === 'low') {
        return item.offer.price <= 10000;
      }
      if (priceValue === 'high') {
        return item.offer.price >= 50000;
      }
    })
    .filter((item) => {
      if (guestsValue === 'any') {
        return item;
      }

      return item.offer.rooms === +guestsValue;
    })
    .filter((item) => {
      const checkedFeatures = [];

      housingFeaturesElement.forEach((feature) => {
        if (item.offer.features) {
          if (feature.checked && !item.offer.features.includes(feature.value)) {
            return checkedFeatures.push(false);
          } else {
            return checkedFeatures.push(true);
          }
        }
      });

      if (!checkedFeatures.includes(false)) {
        return item;
      }
    });

  clearMarkersOnMap();
  addMarkersOnMap(fiilteredAds.slice(0, AMOUNT_ADS));
};

housingTypeElement.addEventListener('change', () => debounce(() => filterMarkers(ADS), RERENDER_DELAY));
housingPriceElement.addEventListener('change', () => debounce(() => filterMarkers(ADS), RERENDER_DELAY));
housingRoomsElement.addEventListener('change', () => debounce(() => filterMarkers(ADS), RERENDER_DELAY));
housingGuestsElement.addEventListener('change', () => debounce(() => filterMarkers(ADS), RERENDER_DELAY));
housingFeaturesElement.forEach((feature) => {
  feature.addEventListener('change', () => debounce(() => filterMarkers(ADS), RERENDER_DELAY));
});

