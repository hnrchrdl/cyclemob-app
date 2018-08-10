import React from 'react';
import App from '../App';

import { shallow } from 'enzyme';

jest.mock('../lib/geolocation');
jest.mock('../lib/gmaps-api');

it('renders without crashing', () => {
  const tree = shallow(<App />);
  expect(tree).toBeTruthy();
});

it('matches snapshot', () => {
  const tree = shallow(<App />);
  expect(tree).toMatchSnapshot();
});

it('watches position changes', done => {
  const tree = shallow(<App />);
  setTimeout(() => {
    expect(tree.state('position')).not.toBeNull();
    tree.setState({ position: null });
    expect(tree.getElement()).toBeNull();
    done();
  });
});

it('toggles Follow User Location', () => {
  const tree = shallow(<App />);
  expect(tree.state('followUserLocation')).toBe(true);
  tree.instance().toggleFollowUserLocation();
  expect(tree.state('followUserLocation')).toBe(false);
});

it('toggles Search and hides', () => {
  const tree = shallow(<App />);
  expect(tree.state('showSearch')).toBe(false);
  expect(tree.find('Search')).toHaveLength(0);
  tree.instance().toggleShowSearch();
  expect(tree.state('showSearch')).toBe(true);
  expect(tree.update().find('Search')).toHaveLength(1);
  tree.instance().hideSearch();
  expect(tree.state('showSearch')).toBe(false);
  expect(tree.update().find('Search')).toHaveLength(0);
});

it('toggles bikecomputer', () => {
  const tree = shallow(<App />);
  expect(tree.state('showBikecomputer')).toBe(false);
  expect(tree.update().find('Bikecomputer')).toHaveLength(0);
  tree.instance().toggleShowBikecomputer();
  expect(tree.state('showBikecomputer')).toBe(true);
  expect(tree.update().find('Bikecomputer')).toHaveLength(1);
});

it('handles location selection and removes marker', () => {
  const tree = shallow(<App />);
  tree.instance().toggleShowSearch(); // show search
  tree.instance().selectLocation({
    id: '1',
    name: 'my name',
    vicinity: 'my description',
    geometry: {
      location: {
        lat: 50,
        lng: 10
      }
    }
  });
  expect(tree.state('showSearch')).toBe(false);
  expect(tree.state('marker')).toHaveLength(1);
  expect(tree.state('markerDetails')).toBeDefined();
  tree.instance().selectLocation({
    id: '2',
    name: 'my name 2',
    vicinity: 'my description 2',
    geometry: {
      location: {
        lat: 50,
        lng: 10
      }
    }
  });
  expect(tree.state('marker')).toHaveLength(2);
  expect(tree.state('markerDetails')).toBeDefined();
  tree.instance().removeMarker({ id: '1' });
  expect(tree.state('marker')).toHaveLength(1);
  expect(tree.update().find('MarkerDetails')).toHaveLength(0);
});

it('handles marker press events, dissmisses marker details', () => {
  const tree = shallow(<App />);
  expect(tree.state('markerDetails')).toBeNull();
  expect(tree.find('MarkerDetails')).toHaveLength(0);
  const marker = {
    id: '123',
    title: 'bla',
    coordinate: { latitude: 40, longitude: 9 },
    description: 'qwertz'
  };
  tree.instance().showMarkerDetails(marker);
  expect(tree.state('markerDetails')).toMatchObject(marker);
  expect(tree.update().find('MarkerDetails')).toHaveLength(1);
  tree.instance().dismissMarkerDetails();
  expect(tree.state('markerDetails')).toBeNull();
  expect(tree.update().find('MarkerDetails')).toHaveLength(0);
});

it('sets and unsets target routes', done => {
  const tree = shallow(<App />);
  expect(tree.state('targetRoute')).toBeNull();
  expect(tree.state('targetDistance')).toBeNull();
  expect(tree.state('targetDuration')).toBeNull();
  expect(tree.state('showTargetRouteDetails')).toBe(false);
  expect(tree.find('RouteDetails')).toHaveLength(0);
  const target = {
    coordinate: { latitude: 50, longitude: 10 },
    description: 'wert',
    id: 'qwert',
    title: '12345'
  };
  tree.instance().setTarget({ ...target });
  expect(tree.state('target')).toMatchObject(target);
  setTimeout(() => {
    expect(tree.state('targetRoute')).toHaveLength(2);
    expect(tree.state('targetDistance')).toBe(70);
    expect(tree.state('targetDuration')).toBe(100);
    expect(tree.state('showTargetRouteDetails')).toBe(true);
    expect(tree.update().find('RouteDetails')).toHaveLength(1);
    tree.instance().hideTargetRouteDetails();
    expect(tree.state('targetRoute')).toHaveLength(2);
    expect(tree.state('showTargetRouteDetails')).toBe(false);
    expect(tree.update().find('RouteDetails')).toHaveLength(0);
    tree.instance().removeTargetRoute();
    expect(tree.state('targetRoute')).toBeNull();
    expect(tree.state('showTargetRouteDetails')).toBe(false);
    tree.instance().unsetTarget();
    expect(tree.state('targetRoute')).toBeNull();
    done();
  });
});
