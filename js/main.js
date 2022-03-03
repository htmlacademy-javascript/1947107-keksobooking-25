const getRandomInt = function (min, max) {
  if (min < 0 || min >= max) {
    return;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const getRandomFloat = function (min, max, numSigns = 5) {
  if (min < 0 || min >= max) {
    return;
  }

  return (Math.random() * (max - min) + min).toFixed(numSigns);
};

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

const getLocation = () => {
  const lat = getRandomFloat(35.65000, 35.70000);
  const lng = getRandomFloat(139.70000, 139.80000);

  return [lat, lng];
};

const userId = Array.from({ length: NUM_OF_ADS }, (v, k) => ++k);

const getUserId = () => {
  const lengthArr = userId.length - 1;
  const randomNum = lengthArr > 1 ? getRandomInt(0, lengthArr) : 0;
  const currentId = userId[randomNum];
  userId.splice(randomNum, 1);

  return currentId !== 10 ? `0${currentId}` : currentId;
};

const gerRandomPropsFromArray = (arrayOfValues) => {
  const finishedArr = [];
  const arr = [ ...arrayOfValues ];
  const randomLengthArr = getRandomInt(1, arr.length);

  for (let i = 0; i < randomLengthArr; i++) {
    const arrLength = arr.length - 1;
    const randomIndex = arrLength > 1 ? getRandomInt(1, arrLength) : 0;
    const currentProp = arr[randomIndex];
    finishedArr.push(currentProp);
    arr.splice(randomIndex, 1);
  }

  return finishedArr;
};

const getOfferInfo = () => {
  const info = {};
  info.rooms = getRandomInt(1, 4);
  info.guests = getRandomInt(1, 6);
  info.features = gerRandomPropsFromArray(FEATURES);
  info.title = `${info.rooms}-я квартира`;
  info.description = `Сдается уютная ${info.rooms}-я квартира. Вмещаемое кол-во человек: ${info.guests}, из удобств в квартире есть: ${info.features.join(', ')}`;
  return info;
};

const getRandomPropFromArray = (arr) => getRandomInt(0, arr.length - 1);

const createAd = () => {

  const [ lat, lng ] = getLocation();
  const { rooms, title, guests, description, features } = getOfferInfo();

  return {
    author: {
      avatar: `img/avatars/user${getUserId()}.png`
    },
    offer: {
      title: title,
      address: `${lat}, ${lng}`,
      price: getRandomInt(100, 1000),
      type: getRandomPropFromArray(TYPES),
      rooms: rooms,
      guests: guests,
      checkin: getRandomPropFromArray(CHECKIN_TIMES),
      checkout: getRandomPropFromArray(CHECKOUT_TIMES),
      features: features,
      description: description,
      photos: gerRandomPropsFromArray(PHOTOS),
    },
    location: {
      lat: lat,
      lng: lng
    }
  };
};

const similarAds = Array.from({ length: NUM_OF_ADS }, createAd);
