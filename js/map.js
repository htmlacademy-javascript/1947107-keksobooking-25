import { activateForm, setAddress } from './form.js';
import { createCard } from './generate-card.js';
import { getData } from './api.js';
import { filterMarkers, saveData } from './filters.js';
import './filters.js';

export const CENTER = {
  lat: 35.67737855391475,
  lng: 139.80102539062503
};
const ZOOM = 12;

const map = L.map('map-canvas');

const tileLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);
const mainMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const markerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const mainMarker = L.marker(CENTER, {
  icon: mainMarkerIcon,
  draggable: true
});

const layerGroup = L.layerGroup();
let layer;

export const addMarkersOnMap = (markers) => {
  markers.forEach((marker) => {
    const pin = L.marker([marker.location.lat, marker.location.lng], {
      icon: markerIcon
    });
    pin.bindPopup(createCard(marker));

    layer = pin.addTo(map);
    layerGroup
      .addLayer(layer)
      .addTo(map);
  });
};

export const clearMarkersOnMap = () => {
  layerGroup.clearLayers();
};

const onSuccess = (ads) => {
  activateForm();
  setAddress(CENTER.lat, CENTER.lng);
  saveData(ads);
  filterMarkers(ads);
};

const onFail = () => {
  map._container.textContent = 'При загрузке данных произошла ошибка';
};

map.on('load', () => {
  getData(
    onSuccess,
    onFail
  );
})
  .setView(CENTER, ZOOM);

tileLayer.addTo(map);
mainMarker.addTo(map);
mainMarker.on('drag', ({latlng}) => {
  setAddress(latlng.lat, latlng.lng);
});
