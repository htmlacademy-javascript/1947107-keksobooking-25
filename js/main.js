// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = function (min, max) {
  if (min < 0 || min >= max) {
    return;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

getRandomInt(0, 10);

const getRandomFloat = function (min, max, numSigns = 2) {
  if (min < 0 || min >= max) {
    return;
  }

  return (Math.random() * (max - min) + min).toFixed(numSigns);
};

getRandomFloat(2.5, 5);
