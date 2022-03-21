import { capacityPerRoom } from './dictionary.js';

const form = document.querySelector('.ad-form');
const capacity = document.querySelector('#capacity');
const roomNumber = document.querySelector('#room_number');
const capacityErrorMeassage = 'Количество мест не соответсвует количеству комнат';
const pristineConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
};

const pristine = new Pristine(form, pristineConfig);

const validateCapacity = (value) => {
  if (capacityPerRoom[roomNumber.value].includes(value)) {
    return true;
  }

  return false;
};

pristine.addValidator(capacity, validateCapacity, capacityErrorMeassage);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
