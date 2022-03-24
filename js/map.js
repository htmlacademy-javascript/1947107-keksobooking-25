import { activateForm } from './form.js';
import { createCard } from './generate-card.js';

const CENTER = [35.67737855391475, 139.80102539062503];
const ZOOM = 12;

const formNotice = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const addressElement = document.querySelector('#address');
const tileLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);
const iconMainMarker = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const iconMarker = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const mainMarker = L.marker(CENTER, {
  icon: iconMainMarker,
  draggable: true
});

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm(formNotice);
    activateForm(filterForm);
    addressElement.value = CENTER
      .map((item) => item.toFixed(5))
      .join(',');
  })
  .setView(CENTER, ZOOM);

tileLayer.addTo(map);
mainMarker.addTo(map);
mainMarker.on('drag', ({ latlng }) => {
  const lat = latlng.lat;
  const lng = latlng.lng;
  addressElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

export const setMarkersOnMap = (data) => {
  data.forEach((card) => {
    const marker = L.marker([card.location.lat, card.location.lng], {
      icon: iconMarker
    });
    marker.addTo(map);
    marker.bindPopup(createCard( card ));
  });
};
