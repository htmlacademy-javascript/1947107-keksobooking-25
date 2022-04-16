import { isEscapeKey } from './util.js';

export const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
export const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

export const createPopup = (popup) => {
  document.body.append(popup);

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt.key)) {
      evt.preventDefault();
      hidePopup(popup);
    }
  };

  function hidePopup() {
    popup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }

  popup.addEventListener('click', () => hidePopup(popup));
  document.addEventListener('keydown', onPopupEscKeydown);
};
