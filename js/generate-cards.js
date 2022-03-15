import { similarAds } from './data.js';
import { typesPremises } from './dictionary.js';

const dataCards = similarAds();
const listCardsElement = document.querySelector('#map-canvas');
const cardElement = document.querySelector('#card')
  .content
  .querySelector('.popup');
const cardsListFragment = document.createDocumentFragment();

const getCards = (data) => {
  data.forEach(({ author, offer }) => {
    const card = cardElement.cloneNode(true);
    const cardPhotosElement = card.querySelector('.popup__photos');
    const cardPhotoElement = card.querySelector('.popup__photo');
    cardPhotosElement.innerHTML = '';
    const featuresListElements = card.querySelectorAll('.popup__feature');
    const featuresCard = offer.features.map((feature) => `popup__feature--${feature}`);

    card.querySelector('.popup__title').textContent = offer.title;
    card.querySelector('.popup__text--address').textContent = offer.address;
    card.querySelector('.popup__text--price').textContent = `${ offer.price } ₽/ночь`;
    card.querySelector('.popup__type').textContent = typesPremises[offer.type];
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
      const cardPhoto = cardPhotoElement.cloneNode(true);
      cardPhoto.src = src;
      cardPhotosElement.append(cardPhoto);
    });
    card.querySelector('.popup__avatar').src = author.avatar;

    cardsListFragment.append(card);
  });
};


const setCards = () => {
  getCards(dataCards);
  listCardsElement.append(cardsListFragment);
};

export { setCards };
