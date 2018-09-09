import { errorHandlerFactory } from './error';
import { Location } from 'expo';

export const watchPosition = callback => {
  Location.watchPositionAsync(
    {
      enableHighAccuracy: true,
      timeInterval: 1000,
      distanceInterval: 1
    },
    position => {
      callback(position);
    },
    errorHandlerFactory('Geoloction error')
  );
};
