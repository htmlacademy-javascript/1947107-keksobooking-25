import { clearMarkersOnMap, addMarkersOnMap } from './map.js';
import { debounce } from './util.js';
import { returnData } from './data.js';

const AMOUNT_ADS = 10;
const RERENDER_DELAY = 500;

const filtersElements = document.querySelector('.map__filters');
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const housingFeaturesElements = document.querySelectorAll('.map__checkbox');

const filterByType = (ad) => {
  const typeValue = housingTypeElement.value;
  console.log('type');

  return typeValue === 'any' || ad.offer.type === typeValue;
};

const filterByPrice = (ad) => {
  const priceValue = housingPriceElement.value;

  if (priceValue === 'any') {
    return true;
  }
  if (priceValue === 'middle') {
    return ad.offer.price >= 10000 && ad.offer.price <= 50000;
  }
  if (priceValue === 'low') {
    return ad.offer.price <= 10000;
  }
  if (priceValue === 'high') {
    return ad.offer.price >= 50000;
  }
};

const filterByRooms = (ad) => {
  const roomsValue = housingRoomsElement.value;

  if (roomsValue === 'any') {
    return true;
  }

  return ad.offer.rooms === +roomsValue;
};

const filterByGuests = (ad) => {
  const guestsValue = housingGuestsElement.value;

  if (guestsValue === 'any') {
    return true;
  }

  return ad.offer.rooms === +guestsValue;
};

const filterByFuetures = (ad) => {
  const checkedFeatures = [];

  housingFeaturesElements.forEach((feature) => {
    if (ad.offer.features) {
      if (feature.checked && !ad.offer.features.includes(feature.value)) {
        return checkedFeatures.push(false);
      } else {
        return checkedFeatures.push(true);
      }
    }
  });

  return !checkedFeatures.includes(false);
};

export const getFilteredAds = (ads) => {
  console.log(ads);
  const filteredAds = ads.slice();

  const test = filteredAds.filters((ad) => {
    console.log(ad);
    return true;
  });

  console.log(test);
  console.log(filteredAds);
  // return filteredAds;
  clearMarkersOnMap();
  addMarkersOnMap(filteredAds.slice(0, AMOUNT_ADS));
};

filtersElements.addEventListener('change', debounce(() => getFilteredAds(returnData()), RERENDER_DELAY));
