import * as helper from '../lib/helper';

it('should create randoms uuid', () => {
  const uuid = helper.createUUID();
  expect(uuid).toBeDefined();
  const newuuid = helper.createUUID();
  expect(uuid).not.toBe(newuuid);
});

it('should create a marker', () => {
  const marker = helper.createMarker({
    id: '1',
    title: '1234',
    description: 'qwertz',
    pinColor: 'tomato',
    lat: 50,
    lng: 10
  });
  expect(marker).toBeDefined();
  expect(marker.id).toBe('1');
  expect(marker.title).toBe('1234');
  expect(marker.description).toBe('qwertz');
  expect(marker.pinColor).toBe('tomato');
  expect(marker.coordinate.latitude).toBe(50);
  expect(marker.coordinate.longitude).toBe(10);
});

it('should compute distance', () => {
  const distance = helper.getDistance(
    { latitude: 50, longitude: 10 },
    { latitude: 55, longitude: 15 }
  );
  expect(distance).toBeCloseTo(651244.81);
});

it('should convert seconds to time', () => {
  expect(helper.sToTime(60)).toBe('00:01:00');
  expect(helper.sToTime(601)).toBe('00:10:01');
  expect(helper.sToTime(6010)).toBe('01:40:10');
});

it('should convert meters to kilometers', () => {
  expect(helper.mToKm(1)).toBe('0.00 km');
  expect(helper.mToKm(6)).toBe('0.01 km');
  expect(helper.mToKm(10)).toBe('0.01 km');
  expect(helper.mToKm(110)).toBe('0.11 km');
  expect(helper.mToKm(10123)).toBe('10.12 km');
  expect(helper.mToKm(10123)).toBe('10.12 km');
  expect(helper.mToKm(10129)).toBe('10.13 km');
});
