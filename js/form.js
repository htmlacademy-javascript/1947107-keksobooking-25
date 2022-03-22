const formNotice = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const capacityElement = document.querySelector('#capacity');
const roomNumberElement = document.querySelector('#room_number');
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

const pristine = new Pristine(formNotice, pristineConfig);

const validateCapacity = (value) => capacityPerRoom[roomNumberElement.value].includes(value);

pristine.addValidator(capacityElement, validateCapacity, capacityErrorMeassage);

formNotice.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const toInactiveState = (form) => {
  form.classList.add('ad-form--disabled');
  const fields = form.children;
  for (const field of fields) {
    field.setAttribute('disabled', '');
  }
};

toInactiveState(formNotice);
toInactiveState(filterForm);

const toActiveState = (form) => {
  form.classList.remove('ad-form--disabled');
  const fields = form.children;
  for (const field of fields) {
    field.removeAttribute('disabled', '');
  }
};

toActiveState(formNotice);
toActiveState(filterForm);
