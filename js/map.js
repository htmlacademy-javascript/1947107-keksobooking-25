import { activateForm, setAddress } from './form.js';
import { createCard } from './generate-card.js';
import { getData } from './api.js';
import { saveData, getLocalData } from './data.js';
import './filters.js';

export const CENTER = {
  lat: 35.67737855391475,
  lng: 139.80102539062503
};
const ZOOM = 12;
const AMOUNT_ADS = 10;

const map = L.map('map-canvas');
const layerGroup = L.layerGroup().addTo(map);

const tileLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);
const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const markerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
export const mainMarker = L.marker(CENTER, {
  icon: mainMarkerIcon,
  draggable: true
});

const addMarkersOnMap = (pin) => {
  layerGroup
    .addLayer(pin)
    .addTo(map);
};

export const renderMarkers = (markers) => {
  markers
    .slice(0, AMOUNT_ADS)
    .forEach((marker) => {
      const pin = L.marker([marker.location.lat, marker.location.lng], {
        icon: markerIcon
      });
      pin.bindPopup(createCard(marker));

      addMarkersOnMap(pin);
    });
};

export const clearMarkersOnMap = () => {
  layerGroup.clearLayers();
};

export const resetMap = (markers) => {
  clearMarkersOnMap();
  renderMarkers(markers);
};

const onSuccessRequest = (ads) => {
  activateForm();
  setAddress(CENTER.lat, CENTER.lng);
  saveData(ads);
  resetMap(getLocalData());
};

const onFailRequest = () => {
  map._container.textContent = 'При загрузке данных произошла ошибка';
};

map.on('load', () => {
  getData(
    onSuccessRequest,
    onFailRequest
  );
})
  .setView(CENTER, ZOOM);

tileLayer.addTo(map);
mainMarker.addTo(map)
  .on('drag', ({latlng}) => {
    setAddress(latlng.lat, latlng.lng);
  });
