import { roomTypeTranslations } from './dictionary.js';

const cardElement = document.querySelector('#card')
  .content
  .querySelector('.popup');

export const createCard = ({author, offer}) => {
  const card = cardElement.cloneNode(true);
  const photosListElement = card.querySelector('.popup__photos');
  const photoElement = card.querySelector('.popup__photo');
  const featuresListElement = card.querySelector('.popup__features');
  const descriptionElement = card.querySelector('.popup__description');

  photosListElement.innerHTML = '';
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${ offer.price } ₽/ночь`;
  card.querySelector('.popup__type').textContent = roomTypeTranslations[offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${ offer.rooms } комнаты для ${ offer.guests } гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${ offer.checkin }, выезд до ${ offer.checkout }`;
  card.querySelector('.popup__avatar').src = author.avatar;

  if (offer.features) {
    offer.features.forEach((feature) => {
      const el = document.createElement('li');
      el.classList.add('popup__feature', `popup__feature--${feature}`);

      featuresListElement.append(el);
    });
  }

  if (!offer.description) {
    descriptionElement.remove();
  } else {
    descriptionElement.textContent = offer.description;
  }

  if (offer.photos) {
    offer.photos.forEach((src) => {
      const cardPhoto = photoElement.cloneNode(true);

      cardPhoto.src = src;

      photosListElement.append(cardPhoto);
    });
  }

  return card;
};
