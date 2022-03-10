const getRandomInt = function (min, max) {
  if (min < 0 || min >= max) {
    throw new Error('Минимальное значение меньше 0, либо больше максимального');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = function (min, max, numSigns = 5) {
  if (min < 0 || min >= max) {
    throw new Error('Минимальное значение меньше 0, либо больше максимального');
  }

  return (Math.random() * (max - min) + min).toFixed(numSigns);
};

export { getRandomInt, getRandomFloat };
