import * as axios from 'axios';
import { google_api_key } from '../env';

const GMAPS_API_URL = 'https://maps.googleapis.com/maps/api'

export const getPlacesAutocomplete = (input, session) => {
  return axios
    .get(
      `${GMAPS_API_URL}/place/autocomplete/json?input=${input}&key=${google_api_key}&session_token=${session}`
    )
    .then(result =>
      result.data.predictions.map(item => ({ ...item, key: item.id }))
    );
};

export const getPlaceDetails = (placeid, session) => {
  return axios
    .get(
      `${GMAPS_API_URL}/place/details/json?placeid=${placeid}&key=${google_api_key}&session_token=${session}`
    )
    .then(result => result.data.result);
};

export const createSessionToken = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const rad = function(x) {
  return x * Math.PI / 180;
};

export const getDistance = function(p1, p2) {
  // https://stackoverflow.com/a/1502821/2024590
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.latitude - p1.latitude);
  var dLong = rad(p2.longitude - p1.longitude);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};