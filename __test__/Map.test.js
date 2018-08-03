import React from 'react';
import Map from '../components/Map';

import renderer from 'react-test-renderer';

jest.mock('react-native-maps', () => {
  const React = require.requireActual('react');
  const MapView = require.requireActual('react-native-maps');

  class MockCallout extends React.Component {
    render() {
      return React.createElement('Callout', this.props, this.props.children);
    }
  }

  class MockMarker extends React.Component {
    render() {
      return React.createElement('Marker', this.props, this.props.children);
    }
  }

  class MockMapView extends React.Component {
    render() {
      return React.createElement('MapView', this.props, this.props.children);
    }
  }

  class MockUrlTile extends React.Component {
    render() {
      return React.createElement('UrlTile', this.props, this.props.children);
    }
  }

  MockCallout.propTypes = MapView.Callout.propTypes;
  MockMarker.propTypes = MapView.Marker.propTypes;
  MockMapView.propTypes = MapView.propTypes;
  MockMapView.Marker = MockMarker;
  MockMapView.Callout = MockCallout;
  MockUrlTile.propTypes = MapView.UrlTile.propTypes;
  MockMapView.UrlTile = MockUrlTile;
  MockMapView.MAP_TYPES = { NONE: 'None' };
  return MockMapView;
});

it('renders without crashing', () => {
  const props = {
    position: {
      coords: {
        latitude: 50,
        longitude: 50
      }
    },
    followPosition: true,
    marker: []
  };
  const rendered = renderer.create(<Map {...props} />).toJSON();
  expect(rendered).toBeTruthy();
});
