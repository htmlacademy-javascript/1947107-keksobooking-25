const form = document.querySelector('.ad-form');
const capacity = document.querySelector('#capacity');
const roomNumber = document.querySelector('#room_number');
const pristineConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
};

const pristine = new Pristine(form, pristineConfig);

const validateCapacity = (value) => {
  const roomValue = +roomNumber.value;

  return (roomValue >= +value && roomValue !== 100 && +value !== 0) || (roomValue === 100 && +value === 0);
};

pristine.addValidator(
  capacity,
  validateCapacity,
  'Количество мест не соответсвует количеству комнат'
);

export const submitForm = () => {
  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();

    if (!isValid) {
      evt.preventDefault();
    }
  });
};
