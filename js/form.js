const formNotice = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const capacityElement = document.querySelector('#capacity');
const roomNumberElement = document.querySelector('#room_number');
const priceElement = document.querySelector('#price');
const capacityErrorMeassage = 'Количество мест не соответсвует количеству комнат';
const slider = document.querySelector('.ad-form__slider');
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

noUiSlider.create(slider, {
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
});

slider.noUiSlider.on('update', (val) => {
  priceElement.value = val[0];
});

priceElement.addEventListener('change', ({ target }) => {
  slider.noUiSlider.set(target.value);
});

const pristine = new Pristine(formNotice, pristineConfig);

const validateCapacity = (value) => capacityPerRoom[roomNumberElement.value].includes(value);

pristine.addValidator(capacityElement, validateCapacity, capacityErrorMeassage);

formNotice.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const deactivateForm = (form) => form.classList.add('ad-form--disabled');

deactivateForm(formNotice);
deactivateForm(filterForm);

export const activateForm = (form) => form.classList.remove('ad-form--disabled');
