export const getRandomInt = function (min, max) {
  if (min < 0 || min >= max) {
    throw new Error('Минимальное значение меньше 0, либо больше максимального');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomFloat = function (min, max, numSigns = 5) {
  if (min < 0 || min >= max) {
    throw new Error('Минимальное значение меньше 0, либо больше максимального');
  }

  return (Math.random() * (max - min) + min).toFixed(numSigns);
};


export const getRandomPropsFromArray = (arrayOfValues) => {
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

export const getRandomPropFromArray = (arr) => arr[getRandomInt(0, arr.length - 1)];
