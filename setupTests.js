// require('react-native-mock/mock');

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock(
  './env',
  () => ({
    google_api_key: 'mock_gmaps_api_key',
    thunderforest_api_key: 'mock_tf_api_key'
  }),
  { virtual: true }
);
