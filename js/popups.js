import { isEscapeKey } from './util.js';

export const succeessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
export const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const hidePopup = (popup) => {
  popup.remove();
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    hidePopup(evt);
  }
};

export const createPopup = (template) => {
  document.body.append(template);

  template.addEventListener('click', (evt) => hidePopup(evt.target));
  document.addEventListener('keydown', onPopupEscKeydown);
};
