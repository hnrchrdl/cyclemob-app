export const createUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const createMarker = ({ id, title, description, pinColor, lat, lng }) => {
    {
        id: id || createUUID(),
        title: title ||'',
        description: item.vicinity || '',
        pinColor: pinColor || null,
        coordinate: {
          latitude: lat,
          longitude: lng
        }
      }
}

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