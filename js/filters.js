import { resetMap } from './map.js';
import { debounce } from './util.js';
import { getLocalData } from './data.js';

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const FILTERS_DELAY = 500;

const filtersElements = document.querySelector('.map__filters');
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');

const filterByType = (ad) => {
  const { value } = housingTypeElement;

  return value === 'any' || ad.offer.type === value;
};

const filterByPrice = (ad) => {
  const { value } = housingPriceElement;

  switch (value) {
    case 'any':
      return true;
    case 'middle':
      return ad.offer.price >= LOW_PRICE && ad.offer.price <= HIGH_PRICE;
    case 'low':
      return ad.offer.price <= LOW_PRICE;
    case 'high':
      return ad.offer.price >= HIGH_PRICE;
  }
};

const filterByRooms = (ad) => {
  const { value } = housingRoomsElement;

  return value === 'any' || ad.offer.rooms === +value;
};

const filterByGuests = (ad) => {
  const { value } = housingGuestsElement;

  return value === 'any' || ad.offer.rooms === +value;
};

const filterByFuetures = (ad) => {
  const checkedFeatures = Array
    .from(document.querySelectorAll('.map__checkbox:checked'))
    .map((element) => element.value);

  return ad.offer.features
    ? checkedFeatures.every((feature) => ad.offer.features.includes(feature))
    : checkedFeatures.length === 0;
};

const getFilteredAds = (ads) =>  ads
  .filter((ad) => filterByType(ad) && filterByPrice(ad) && filterByRooms(ad) && filterByGuests(ad) && filterByFuetures(ad));

const changeFilters = debounce(
  () => {
    const filteredAds = getFilteredAds(getLocalData());

    resetMap(filteredAds);
  },
  FILTERS_DELAY
);

filtersElements.addEventListener('change', changeFilters);
