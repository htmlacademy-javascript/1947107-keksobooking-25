const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const fileChooserAvatar = document.querySelector('#avatar');
const fileChooserImages = document.querySelector('#images');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imagesPreview = document.querySelector('.ad-form__photo');
const imagePreviewElement = document.createElement('img');

const checkAvailableType = (file) => FILE_TYPES.some((it) => file.name.toLowerCase().endsWith(it));

const onAvatarChange = (fileChooser) => {
  const file = fileChooser.files[0];

  if (checkAvailableType(file)) {
    avatarPreview.src = URL.createObjectURL(file);
  }
};

const onPhotosChange = (fileChooser) => {
  imagesPreview.append(imagePreviewElement);
  const img = imagesPreview.querySelector('img');
  const file = fileChooser.files[0];

  if (checkAvailableType(file)) {
    img.src = URL.createObjectURL(file);
  }
};

export const clearPreview = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  imagePreviewElement.remove();
};

fileChooserAvatar.addEventListener('change', (evt) => onAvatarChange(evt.target));
fileChooserImages.addEventListener('change', (evt) => onPhotosChange(evt.target));
