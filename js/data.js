import {
  getRandomInt,
  getRandomFloat,
  getRandomPropsFromArray,
  getRandomPropFromArray
} from './util.js';

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const NUM_OF_ADS = 10;

const createAd = (id) => {
  const rooms = getRandomInt(1, 4);
  const guests = getRandomInt(1, 6);
  const features = FEATURES.slice(0, getRandomInt(0, FEATURES.length - 1));
  const title = `${rooms}-я квартира`;
  const description = `Сдается уютная ${rooms}-я квартира. Вмещаемое кол-во человек: ${guests}, из удобств в квартире есть: ${features.join(', ')}`;
  const price = getRandomInt(100, 1000);
  const type = getRandomPropFromArray(TYPES);
  const checkin = getRandomPropFromArray(CHECKIN_TIMES);
  const checkout = getRandomPropFromArray(CHECKOUT_TIMES);
  const photos = getRandomPropsFromArray(PHOTOS);
  const location = {
    lat: getRandomFloat(35.65000, 35.70000),
    lng: getRandomFloat(139.70000, 139.80000)
  };

  return {
    author: {
      avatar: `img/avatars/user${id >= 10 ? id : id.toString().padStart(2, '0')}.png`
    },
    offer: {
      title,
      address: `${location.lat}, ${location.lng}`,
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout,
      features,
      description,
      photos,
    },
    location
  };
};

const similarAds = () => Array.from({ length: NUM_OF_ADS }, (v, k) => createAd(++k));

export { similarAds };
