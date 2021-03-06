import axios from 'axios';
import { google_api_key as key } from '../env';
const decodePolyline = require('decode-google-map-polyline');

const GMAPS_API_URL = 'https://maps.googleapis.com/maps/api';
const SEARCH_RADIUS = 150000;

export const getPlacesAutocomplete = (input, position, session_token) => {
  const params = {
    input,
    location: `${position.latitude},${position.longitude}`,
    radius: SEARCH_RADIUS,
    key,
    session_token
  };
  const url = `${GMAPS_API_URL}/place/autocomplete/json?${paramsToString(
    params
  )}`;
  return axios.get(url).then(({ data }) => {
    if (data.status === 'OK') {
      return data.predictions.map(item => ({ ...item, key: item.id }));
    }
    return null;
  });
};

export const getPlaceDetails = (placeid, session_token) => {
  const params = {
    placeid,
    key,
    session_token
  };
  return axios
    .get(`${GMAPS_API_URL}/place/details/json?${paramsToString(params)}`)
    .then(({ data }) => {
      if (data.status === 'OK') {
        return data.result;
      }
      return null;
    });
};

export const getRoute = (origin, destination, waypoints) => {
  const params = {
    origin: `${origin.latitude},${origin.longitude}`,
    destination: `${destination.latitude},${destination.longitude}`,
    waypoints: waypoints
      ? waypoints
        .map(waypoint => `${waypoint.latitude},${waypoint.longitude}`)
        .join('|')
      : null,
    mode: 'bicycling',
    units: 'metric',
    key
  };
  return axios
    .get(`${GMAPS_API_URL}/directions/json?${paramsToString(params)}`)
    .then(({ data }) => {
      if (data.status === 'OK') {
        const polyline = data.routes[0].overview_polyline.points;
        const route = decodePolyline(polyline).map(coords => ({
          latitude: coords.lat,
          longitude: coords.lng
        }));
        const distance = data.routes[0].legs.reduce((result, curr) => {
          result += curr.distance.value;
          return result;
        }, 0);
        const duration = data.routes[0].legs.reduce((result, curr) => {
          result += curr.duration.value;
          return result;
        }, 0);
        return { route, distance, duration };
      }
      return null;
    });
};

function paramsToString(params) {
  const keys = Object.keys(params);
  return keys
    .filter(key => !!params[key])
    .map(key => `${key}=${params[key]}`)
    .join('&');
}
