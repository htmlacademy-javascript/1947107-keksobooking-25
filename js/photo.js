const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const fileChooserAvatarElement = document.querySelector('#avatar');
const fileChooserImagesElement = document.querySelector('#images');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const imagePreviewElement = document.querySelector('.ad-form__photo img');

const checkAvailableType = (file) => FILE_TYPES.some((it) => file.name.toLowerCase().endsWith(it));

const setAvatarChange = (fileChooser) => {
  const file = fileChooser.files[0];

  if (checkAvailableType(file)) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
};

const setPhotosChange = (fileChooser) => {
  const file = fileChooser.files[0];

  if (file && checkAvailableType(file)) {
    imagePreviewElement.src = URL.createObjectURL(file);
  }

};

export const clearPreview = () => {
  avatarPreviewElement.src = DEFAULT_AVATAR;
  imagePreviewElement.src = '';
};

fileChooserAvatarElement.addEventListener('change', (evt) => setAvatarChange(evt.target));
fileChooserImagesElement.addEventListener('change', (evt) => setPhotosChange(evt.target));
