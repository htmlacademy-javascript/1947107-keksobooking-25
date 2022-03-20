import { similarAds } from './data.js';
import { roomTypeTranslations } from './dictionary.js';

const cardElement = document.querySelector('#card')
  .content
  .querySelector('.popup');
const listCardsElement = document.querySelector('#map-canvas');

const createCard = ({author, offer}) => {
  const card = cardElement.cloneNode(true);
  const photosListElement = card.querySelector('.popup__photos');
  const photoElement = card.querySelector('.popup__photo');
  const featuresListElements = card.querySelectorAll('.popup__feature');
  const descriptionElement = card.querySelector('.popup__description');
  const featuresCard = offer.features.map((feature) => `popup__feature--${feature}`);

  photosListElement.innerHTML = '';
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${ offer.price } ₽/ночь`;
  card.querySelector('.popup__type').textContent = roomTypeTranslations[offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${ offer.rooms } комнаты для ${ offer.guests } гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${ offer.checkin }, выезд до ${ offer.checkout }`;
  card.querySelector('.popup__avatar').src = author.avatar;

  featuresListElements.forEach((feature) => {
    const classFeature = feature.classList[1];

    if (!featuresCard.includes(classFeature)) {
      feature.remove();
    }
  });

  if (!offer.description) {
    descriptionElement.remove();
  } else {
    descriptionElement.textContent = offer.description;
  }

  offer.photos.forEach((src) => {
    const cardPhoto = photoElement.cloneNode(true);

    cardPhoto.src = src;

    photosListElement.append(cardPhoto);
  });

  return card;
};

const createCardsList = (amount) => {
  const cardsListFragment = document.createDocumentFragment();
  const data = similarAds(amount);

  data.forEach((card) => cardsListFragment.append(createCard(card)));

  return cardsListFragment;
};

const renderCards = (amount) => {
  const cardsList = createCardsList(amount);

  listCardsElement.append(cardsList);
};

export { renderCards };
