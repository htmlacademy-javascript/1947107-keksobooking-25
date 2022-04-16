const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const fileChooserAvatar = document.querySelector('#avatar');
const fileChooserImages = document.querySelector('#images');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imagePreview = document.querySelector('.ad-form__photo img');

const checkAvailableType = (file) => FILE_TYPES.some((it) => file.name.toLowerCase().endsWith(it));

const setAvatarChange = (fileChooser) => {
  const file = fileChooser.files[0];

  if (checkAvailableType(file)) {
    avatarPreview.src = URL.createObjectURL(file);
  }
};

const setPhotosChange = (fileChooser) => {
  const file = fileChooser.files[0];

  if (file && checkAvailableType(file)) {
    imagePreview.src = URL.createObjectURL(file);
  }

};

export const clearPreview = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  imagePreview.src = '';
};

fileChooserAvatar.addEventListener('change', (evt) => setAvatarChange(evt.target));
fileChooserImages.addEventListener('change', (evt) => setPhotosChange(evt.target));
