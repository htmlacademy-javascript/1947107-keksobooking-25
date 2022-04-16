import { sendData } from './api.js';
import { CENTER, renderMarkers, resetMap } from './map.js';
import { createPopup, successTemplate, errorTemplate } from './popups.js';
import { getLocalData } from './data.js';
import { clearPreview } from './photo.js';

const ERROR_MESSAGES = {
  CAPACITY: 'Количество мест не соответсвует количеству комнат',
  PRICE: 'Минимальная цена данного типа жилья выше!'
};

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

const formAd = document.querySelector('.ad-form');
const formFilter = document.querySelector('.map__filters');
const capacityElement = document.querySelector('#capacity');
const roomNumberElement = document.querySelector('#room_number');
const priceElement = document.querySelector('#price');
const typeElement = document.querySelector('#type');
const addressElement = document.querySelector('#address');
const timeinElement = document.querySelector('#timein');
const timeoutElement = document.querySelector('#timeout');
const slider = document.querySelector('.ad-form__slider');
const sendButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

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

noUiSlider.create(slider, sliderConfig);

const onPricePlaceholder = (type) => {
  priceElement.placeholder = MinRoomPrice[type];
};

const setSliderValue = (val) => slider.noUiSlider.set(val);

priceElement.addEventListener('change', ({ target }) => {
  setSliderValue(target.value);
});
timeinElement.addEventListener('change', ({ target }) => {
  timeoutElement.value = target.value;
});
timeoutElement.addEventListener('change', ({ target }) => {
  timeinElement.value = target.value;
});

const pristine = new Pristine(formAd, pristineConfig);

const validateCapacity = (value) => RoomCapacity[roomNumberElement.value].includes(value);
const validatePrice = (value) => MinRoomPrice[typeElement.value] <= +value;

pristine.addValidator(capacityElement, validateCapacity, ERROR_MESSAGES.CAPACITY);
pristine.addValidator(priceElement, validatePrice, ERROR_MESSAGES.PRICE);

const deactivateForms = () => {
  formAd.classList.add('ad-form--disabled');
  formFilter.classList.add('ad-form--disabled');
};

deactivateForms();

export const activateForm = () => {
  formAd.classList.remove('ad-form--disabled');
  formFilter.classList.remove('ad-form--disabled');
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
  onPricePlaceholder(typeElement.value);
  setSliderValue(MinRoomPrice[typeElement.value]);
};

const resetForm = () => {
  formAd.reset();
  formFilter.reset();
  renderMarkers(getLocalData());
  clearPreview();
  resetMap();
  removeErrors();
  resetPrice();
  setAddress(CENTER.lat, CENTER.lng);
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const toggleSendButtonState = () => sendButton.classList.toggle('ad-form--disabled');

const onSuccess = () => {
  resetForm();
  toggleSendButtonState();
  createPopup(successTemplate);
};

const onFail = () => {
  toggleSendButtonState();
  createPopup(errorTemplate);
};

formAd.addEventListener('submit', (evt) => {
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

typeElement.addEventListener('change', (evt) => onPricePlaceholder(evt.target.value));
roomNumberElement.addEventListener('change', () => pristine.validate());
slider.noUiSlider.on('change', (val) => {
  priceElement.value = val[0];
  pristine.validate();
});
