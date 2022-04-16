import { updateLayerMap } from './map.js';
import { debounce } from './util.js';
import { getLocalData } from './data.js';

const PRICE = {
  LOW: 10000,
  HIGH: 50000
};
const FILTERS_DELAY = 500;
const DEFAULT_VALUE = 'any';

const filtersElements = document.querySelector('.map__filters');
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');

const filterByType = (ad) => {
  const { value } = housingTypeElement;

  return value === DEFAULT_VALUE || ad.offer.type === value;
};

const filterByPrice = (ad) => {
  const { value } = housingPriceElement;

  switch (value) {
    case 'middle':
      return ad.offer.price >= PRICE.LOW && ad.offer.price <= PRICE.HIGH;
    case 'low':
      return ad.offer.price <= PRICE.LOW;
    case 'high':
      return ad.offer.price >= PRICE.HIGH;
    default:
      return true;
  }
};

const filterByRooms = (ad) => {
  const { value } = housingRoomsElement;

  return value === DEFAULT_VALUE || ad.offer.rooms === +value;
};

const filterByGuests = (ad) => {
  const { value } = housingGuestsElement;

  return value === DEFAULT_VALUE || ad.offer.rooms === +value;
};

const filterByFeutures = (ad) => {
  const checkedFeatures = Array
    .from(document.querySelectorAll('.map__checkbox:checked'))
    .map((element) => element.value);

  return ad.offer.features
    ? checkedFeatures.every((feature) => ad.offer.features.includes(feature))
    : checkedFeatures.length === 0;
};

const getFilteredAds = (ads) =>  ads
  .filter((ad) => filterByType(ad) &&
    filterByPrice(ad) &&
    filterByRooms(ad) &&
    filterByGuests(ad) &&
    filterByFeutures(ad));

const onFiltersChange = debounce(
  () => {
    const filteredAds = getFilteredAds(getLocalData());

    updateLayerMap(filteredAds);
  },
  FILTERS_DELAY
);

filtersElements.addEventListener('change', onFiltersChange);
