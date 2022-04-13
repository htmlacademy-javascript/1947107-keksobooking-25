import { checkAvailableType } from './util.js';

const fileChooserAvatar = document.querySelector('#avatar');
const fileChooserImages = document.querySelector('#images');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imagesPreview = document.querySelector('.ad-form__photo img');

const setPreview = (fileChooser, previewContainer) => {
  const file = fileChooser.files[0];

  if (checkAvailableType(file)) {
    previewContainer.src = URL.createObjectURL(file);
  }
};

fileChooserAvatar.addEventListener('change', (evt) => setPreview(evt.target, avatarPreview));
fileChooserImages.addEventListener('change', (evt) => setPreview(evt.target, imagesPreview));
