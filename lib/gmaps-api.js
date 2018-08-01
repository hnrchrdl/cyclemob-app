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
