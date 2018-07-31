import * as axios from 'axios';
import { google_api_key } from '../env';

export const getPlacesAutocomplete = (input, session) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${google_api_key}&session_token=${session}`
    )
    .then(result =>
      result.data.predictions.map(item => ({ ...item, key: item.id }))
    );
};

export const getPlaceDetails = (placeid, session) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${google_api_key}&session_token=${session}`
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
