import { sendData } from './api.js';
import { CENTER, resetMap } from './map.js';
import { createPopup, successTemplate, errorTemplate } from './popups.js';
import { clearPreview } from './photo.js';

const ERROR_MESSAGES = {
  CAPACITY: 'Количество мест не соответсвует количеству комнат',
  PRICE: 'Минимальная цена данного типа жилья выше!'
};
const DEFAULT_PRICE_VALUE = 1000;

const MinRoomPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};
const RoomCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const formAdElement = document.querySelector('.ad-form');
const formFilterElement = document.querySelector('.map__filters');
const capacityElement = document.querySelector('#capacity');
const roomNumberElement = document.querySelector('#room_number');
const priceElement = document.querySelector('#price');
const typeElement = document.querySelector('#type');
const addressElement = document.querySelector('#address');
const timeinElement = document.querySelector('#timein');
const timeoutElement = document.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');
const sendButtonElement = document.querySelector('.ad-form__submit');
const resetButtonElement = document.querySelector('.ad-form__reset');

const pristineConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
};
const sliderConfig = {
  start: MinRoomPrice[typeElement.value],
  connect: 'lower',
  step: 1000,
  range: {
    'min': 0,
    'max': 100000
  },
  format: {
    to (value) {
      return value;
    },
    from (value) {
      return Number(value).toFixed();
    }
  }
};

noUiSlider.create(sliderElement, sliderConfig);

const setPricePlaceholder = (type) => {
  priceElement.placeholder = MinRoomPrice[type];
};

const setSliderValue = (val) => sliderElement.noUiSlider.set(val);

priceElement.addEventListener('change', ({ target }) => {
  setSliderValue(target.value);
});
timeinElement.addEventListener('change', ({ target }) => {
  timeoutElement.value = target.value;
});
timeoutElement.addEventListener('change', ({ target }) => {
  timeinElement.value = target.value;
});

const pristine = new Pristine(formAdElement, pristineConfig);

const validateCapacity = (value) => RoomCapacity[roomNumberElement.value].includes(value);
const validatePrice = (value) => MinRoomPrice[typeElement.value] <= +value;

pristine.addValidator(capacityElement, validateCapacity, ERROR_MESSAGES.CAPACITY);
pristine.addValidator(priceElement, validatePrice, ERROR_MESSAGES.PRICE);

const deactivateForms = () => {
  formAdElement.classList.add('ad-form--disabled');
  formFilterElement.classList.add('ad-form--disabled');
};

deactivateForms();

export const activateForms = () => {
  formAdElement.classList.remove('ad-form--disabled');
  formFilterElement.classList.remove('ad-form--disabled');
};

export const setAddress = (lat, lng) => {
  addressElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const removeErrors = () => {
  document.querySelectorAll('.pristine-error')
    .forEach((error) => {
      error.textContent = '';
    });
};

const resetPrice = () => {
  priceElement.placeholder = DEFAULT_PRICE_VALUE;
  setSliderValue(DEFAULT_PRICE_VALUE);
};

const resetForm = () => {
  formAdElement.reset();
  formFilterElement.reset();
  resetMap();
  clearPreview();
  removeErrors();
  resetPrice();
  setAddress(CENTER.lat, CENTER.lng);
};

resetButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const toggleSendButtonState = () => sendButtonElement.classList.toggle('ad-form--disabled');

const onSuccess = () => {
  resetForm();
  toggleSendButtonState();
  createPopup(successTemplate);
};

const onFail = () => {
  toggleSendButtonState();
  createPopup(errorTemplate);
};

formAdElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  const formData = new FormData(evt.target);

  if (isValid) {
    toggleSendButtonState();
    sendData(
      onSuccess,
      onFail,
      formData
    );
  }
});

typeElement.addEventListener('change', (evt) => setPricePlaceholder(evt.target.value));
roomNumberElement.addEventListener('change', () => pristine.validate());
sliderElement.noUiSlider.on('change', (val) => {
  priceElement.value = val[0];
  pristine.validate();
});
