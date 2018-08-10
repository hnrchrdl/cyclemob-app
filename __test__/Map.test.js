import React from 'react';
import Map from '../components/Map';

import { shallow } from 'enzyme';

jest.mock('react-native-maps', () => {
  const React = require.requireActual('react');
  const MapView = require.requireActual('react-native-maps');

  class MockCallout extends React.Component {
    render() {
      // eslint-disable-next-line react/prop-types
      return React.createElement('Callout', this.props, this.props.children);
    }
  }

  class MockMarker extends React.Component {
    render() {
      // eslint-disable-next-line react/prop-types
      return React.createElement('Marker', this.props, this.props.children);
    }
  }

  class MockMapView extends React.Component {
    render() {
      // eslint-disable-next-line react/prop-types
      return React.createElement('MapView', this.props, this.props.children);
    }
  }

  class MockUrlTile extends React.Component {
    render() {
      // eslint-disable-next-line react/prop-types
      return React.createElement('UrlTile', this.props, this.props.children);
    }
  }

  class MockPolyline extends React.Component {
    render() {
      // eslint-disable-next-line react/prop-types
      return React.createElement('Polyline', this.props, this.props.children);
    }
  }

  MockCallout.propTypes = MapView.Callout.propTypes;
  MockMarker.propTypes = MapView.Marker.propTypes;
  MockMapView.propTypes = MapView.propTypes;
  MockMapView.Marker = MockMarker;
  MockMapView.Callout = MockCallout;
  MockUrlTile.propTypes = MapView.UrlTile.propTypes;
  MockMapView.UrlTile = MockUrlTile;
  MockMapView.Polyline = MockPolyline;
  MockPolyline.propTypes = MapView.Polyline.propTypes;
  MockMapView.MAP_TYPES = { NONE: 'None' };
  return MockMapView;
});

const props = {
  position: {
    coords: {
      latitude: 50,
      longitude: 10
    }
  },
  followPosition: true,
  marker: [],
  onMarkerPressed: jest.fn()
};

it('renders without crashing', () => {
  const tree = shallow(<Map {...props} />);
  expect(tree).toBeTruthy();
});

it('matches snapshot', () => {
  const tree = shallow(<Map {...props} />);
  expect(tree).toMatchSnapshot();
});

it('should not render without position', () => {
  const tree = shallow(<Map {...props} />);
  tree.setProps({
    position: null
  });
  expect(tree.getElement()).toBeNull();
});

it('handles position updates correctly', () => {
  const tree = shallow(<Map {...props} />);
  tree.instance().map = {
    animateToCoordinate: jest.fn()
  };
  const positionUpdate = {
    position: {
      coords: {
        latitude: 55,
        longitude: 15
      }
    }
  };
  tree.setProps(positionUpdate);
  tree.update();
  expect(tree.instance().map.animateToCoordinate).toHaveBeenCalledWith(
    positionUpdate.position.coords
  );
});

it('only animates map if followPosition is turned on', () => {
  const tree = shallow(<Map {...props} />);
  tree.instance().map = {
    animateToCoordinate: jest.fn()
  };
  tree.setProps({
    followPosition: false
  });
  tree.update();
  expect(tree.instance().map.animateToCoordinate).not.toHaveBeenCalled();
  tree.setProps({
    followPosition: true
  });
  tree.update(); // should animate map
  tree.setProps({
    position: {
      coords: {
        latitude: 55,
        longitude: 15
      }
    }
  });
  tree.update(); // should animate map
  tree.setProps({
    followPosition: false
  });
  tree.update();
  tree.setProps({
    position: {
      coords: {
        latitude: 55,
        longitude: 15
      }
    }
  });
  tree.update();
  expect(tree.instance().map.animateToCoordinate).toHaveBeenCalledTimes(2);
});

it('handles marker updates correctly', () => {
  const tree = shallow(<Map {...props} />);
  expect(tree.find('MockMarker')).toHaveLength(0);
  const marker = [
    {
      id: 'markerid',
      coordinate: {
        latitude: 60,
        longitude: 20
      }
    },
    {
      id: 'markerid',
      coordinate: {
        latitude: 70,
        longitude: 25
      }
    }
  ];
  tree.setProps({
    marker
  });
  tree.update();
  expect(tree.find('MockMarker')).toHaveLength(2);
  expect(
    tree
      .find('MockMarker')
      .first()
      .prop('coordinate')
  ).toMatchObject(marker[0].coordinate);
  expect(
    tree
      .find('MockMarker')
      .at(1)
      .prop('coordinate')
  ).toMatchObject(marker[1].coordinate);
});

it('handles route updates correctly', () => {
  const tree = shallow(<Map {...props} />);
  expect(tree.find('MockPolyline')).toHaveLength(0);
  const route = [
    {
      latitude: 60,
      longitude: 20
    },
    {
      latitude: 65,
      longitude: 25
    },
    {
      latitude: 70,
      longitude: 30
    }
  ];
  tree.setProps({
    route
  });
  tree.update();
  expect(tree.find('MockPolyline')).toHaveLength(1);
  expect(tree.find('MockPolyline').prop('coordinates')).toMatchObject(route);
});

it('reacts to marker press events correctly', () => {
  const tree = shallow(<Map {...props} />);
  expect(tree.find('MockMarker')).toHaveLength(0);
  const marker = [
    {
      id: 'markerid',
      coordinate: {
        latitude: 60,
        longitude: 20
      }
    },
    {
      id: 'markerid',
      coordinate: {
        latitude: 70,
        longitude: 25
      }
    }
  ];
  tree.setProps({
    marker
  });
  tree.update();
  tree
    .find('MockMarker')
    .first()
    .simulate('press');
  expect(props.onMarkerPressed).toHaveBeenCalledWith(marker[0]);
});

it('should handle map press events', () => {
  const onMapLongPressed = jest.fn();
  const p = { ...props, onMapLongPressed };
  const tree = shallow(<Map {...p} />);
  tree.find('MockMapView').simulate('longPress');
  expect(onMapLongPressed).toHaveBeenCalledTimes(1);
});
