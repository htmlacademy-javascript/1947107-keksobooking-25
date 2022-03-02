// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = function (min, max) {
  if (min < 0 || min >= max) {
    return;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInt(0, 10);

const getRandomFloat = function (min, max, numSigns = 5) {
  if (min < 0 || min >= max) {
    return;
  }

  return (Math.random() * (max - min) + min).toFixed(numSigns);
};

getRandomFloat(2.5, 5);

const TITLES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
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

const AD_CURRENT = 2;

const getLocation = () => {
  const lat = getRandomFloat(35.65000, 35.70000);
  const lng = getRandomFloat(139.70000, 139.80000);
  return [lat, lng];
};

const getOfferInfo = () => {
  const info = {};
  info.rooms = getRandomInt(1, 4);
  info.guests = getRandomInt(1, 6);
  info.features = [ 'wifi', 'dishwasher' ];
  info.title = `${info.rooms}-я квартира`;
  info.description = `Сдается уютная ${info.rooms}-я квартира. Вмещаемое кол-во человек: ${info.guests}, из удобств в квартире есть: ${info.features.join(', ')}`;
  return info;
};

const getRandomPropFromArray = (arr) => getRandomInt(0, arr.length - 1);

const createAd = () => {

  // const getAvatar = () => {
  //   let num = getRandomInt(1, 10);
  //   if (num !== 10) {
  //     num = `0${num}`;
  //   }
  //   return num;
  // };

  const [ lat, lng ] = getLocation();
  const { rooms, title, guests, description } = getOfferInfo();

  return {
    // author: {
    //   avatar: `img/avatars/user${getAvatar()}.png`
    // },
    offer: {
      title: title,
      address: `${lat}, ${lng}`,
      price: getRandomInt(100, 1000),
      type: getRandomPropFromArray(TYPES),
      rooms: rooms,
      guests: guests,
      checkin: getRandomPropFromArray(CHECKIN_TIMES),
      checkout: getRandomPropFromArray(CHECKOUT_TIMES),
      // features: [ 'wifi', 'dishwasher' ],
      description: description,
      // photos: [
      //   'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
      //   'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg'
      // ],
    },
    location: {
      lat: lat,
      lng: lng
    }
  };
};

const test = Array.from({ length: 2 }, createAd);

console.log(test);
