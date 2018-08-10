export function watchPosition(callback) {
  callback({
    coords: {
      latitude: 50,
      longitude: 10,
      speed: 1000,
      altitude: 0
    }
  });
}
