const form = document.querySelector('.ad-form');
const capacity = document.querySelector('#capacity');
const roomNumber = document.querySelector('#room_number');
const capacityErrorMeassage = 'Количество мест не соответсвует количеству комнат';
const pristineConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
};
const capacityPerRoom = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const pristine = new Pristine(form, pristineConfig);

const validateCapacity = (value) => capacityPerRoom[roomNumber.value].includes(value);

pristine.addValidator(capacity, validateCapacity, capacityErrorMeassage);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
