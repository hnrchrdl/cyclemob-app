import { errorHandlerFactory } from './error';

export const watchPosition = callback => {
  navigator.geolocation.watchPosition(
    position => {
      callback(position);
    },
    errorHandlerFactory('Geoloction error'),
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 36000,
      distanceFilter: 1
    }
  );
};
