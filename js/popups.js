import { isEscapeKey } from './util.js';

export const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
export const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const onPopupEscKeydown = (evt, popup) => {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    hidePopup(popup);
  }
};

function hidePopup (popup) {
  popup.remove();
  document.removeEventListener('keydown', onPopupEscKeydown);
}

export const createPopup = (template) => {
  document.body.append(template);

  template.addEventListener('click', (evt) => hidePopup(evt.target));
  document.addEventListener('keydown', (evt) => onPopupEscKeydown(evt, template));
};
