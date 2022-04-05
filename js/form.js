import { sendData } from './api.js';
import { CENTER } from './map.js';
import { createPopup, succeessTemplate, errorTemplate } from './popups.js';

export const DEFAULT_PRICE = 5000;

const formNotice = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const capacityElement = document.querySelector('#capacity');
const roomNumberElement = document.querySelector('#room_number');
const priceElement = document.querySelector('#price');
const typeElement = document.querySelector('#type');
const addressElement = document.querySelector('#address');
const timeinElement = document.querySelector('#timein');
const timeoutElement = document.querySelector('#timeout');
const capacityErrorMeassage = 'Количество мест не соответсвует количеству комнат';
const priceErrorMeassage = 'Минимальная цена данного типа жилья выше!';
const slider = document.querySelector('.ad-form__slider');
const resetButton = document.querySelector('.ad-form__reset');
const pristineConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
};
const sliderConfig = {
  start: 5000,
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
const capacityPerRoom = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};
const minPriceForTypePremise = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

noUiSlider.create(slider, sliderConfig);

slider.noUiSlider.on('update', (val) => {
  priceElement.value = val[0];
});

priceElement.addEventListener('change', ({ target }) => {
  slider.noUiSlider.set(target.value);
});
timeinElement.addEventListener('change', ({ target }) => {
  timeoutElement.value = target.value;
});
timeoutElement.addEventListener('change', ({ target }) => {
  timeinElement.value = target.value;
});

const pristine = new Pristine(formNotice, pristineConfig);

const validateCapacity = (value) => capacityPerRoom[roomNumberElement.value].includes(value);
const validatePrice = (value) => minPriceForTypePremise[typeElement.value] <= +value;

pristine.addValidator(capacityElement, validateCapacity, capacityErrorMeassage);
pristine.addValidator(priceElement, validatePrice, priceErrorMeassage);

const deactivateForms = () => {
  formNotice.classList.add('ad-form--disabled');
  filterForm.classList.add('ad-form--disabled');
};

deactivateForms();

export const activateForm = () => {
  formNotice.classList.remove('ad-form--disabled');
  filterForm.classList.remove('ad-form--disabled');
};

export const setAddress = (lat, lng) => {
  addressElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const resetForm = () => {
  formNotice.reset();
  setAddress(CENTER.lat, CENTER.lng);
  priceElement.value = DEFAULT_PRICE;
};

resetButton.addEventListener('click', resetForm);

const onSuccess = () => {
  resetForm();
  createPopup(succeessTemplate);
};

const onFail = () => {
  createPopup(errorTemplate);
};

formNotice.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  const formData = new FormData(evt.target);

  if(isValid) {
    sendData(
      onSuccess,
      onFail,
      formData
    );
  }
});
