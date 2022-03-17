import { similarAds } from './data.js';
import { roomTypeTranslations } from './dictionary.js';

const createCard = ({ author, offer }) => {
  const cardElement = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const card = cardElement.cloneNode(true);

  const photosListElement = card.querySelector('.popup__photos');
  const photoElement = card.querySelector('.popup__photo');
  photosListElement.innerHTML = '';
  const featuresListElements = card.querySelectorAll('.popup__feature');
  const featuresCard = offer.features.map((feature) => `popup__feature--${feature}`);

  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${ offer.price } ₽/ночь`;
  card.querySelector('.popup__type').textContent = roomTypeTranslations[offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${ offer.rooms } комнаты для ${ offer.guests } гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${ offer.checkin }, выезд до ${ offer.checkout }`;
  featuresListElements.forEach((feature) => {
    const classFeature = feature.classList[1];

    if(!featuresCard.includes(classFeature)) {
      feature.remove();
    }
  });
  if (!offer.description) {
    card.querySelector('.popup__description').remove();
  } else {
    card.querySelector('.popup__description').textContent = offer.description;
  }
  offer.photos.forEach((src) => {
    const cardPhoto = photoElement.cloneNode(true);
    cardPhoto.src = src;
    photosListElement.append(cardPhoto);
  });
  card.querySelector('.popup__avatar').src = author.avatar;

  return card;
};

const createCardsList = (amount) => {
  const cardsListFragment = document.createDocumentFragment();
  const data = similarAds(amount);
  for (let i = 0; i < amount; i++) {
    const card = createCard(data[i]);
    cardsListFragment.append(card);
  };
  return cardsListFragment;
};

const renderCards = (amount) => {
  const listCardsElement = document.querySelector('#map-canvas');
  const cardsList = createCardsList(amount);
  listCardsElement.append(cardsList);
};

export { renderCards };
