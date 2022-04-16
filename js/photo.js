const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const fileChooserAvatar = document.querySelector('#avatar');
const fileChooserImages = document.querySelector('#images');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imagesPreview = document.querySelector('.ad-form__photo');

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
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    imagesPreview.append(img);
  }

};

export const clearPreview = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  imagesPreview.querySelectorAll('img')
    .forEach((img) => img.remove());
};

fileChooserAvatar.addEventListener('change', (evt) => setAvatarChange(evt.target));
fileChooserImages.addEventListener('change', (evt) => setPhotosChange(evt.target));
