import { isEscapeKey } from './util.js';

const hidePopup = (popup) => {
  popup.target.remove();
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePopup(evt);
  }
};

export const createSuccessPopup = () => {
  const succeessTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  document.body.append(succeessTemplate);

  const successElement = document.querySelector('.success');
  successElement.addEventListener('click', hidePopup);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export const createFailPopup = () => {
  const errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  document.body.append(errorTemplate);

  const errorElement = document.querySelector('.error__button');
  errorElement.addEventListener('click', hidePopup);
  document.addEventListener('keydown', onPopupEscKeydown);
};
