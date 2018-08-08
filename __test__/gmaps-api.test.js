import * as gmapsApi from '../lib/gmaps-api';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

it('should call autocomplete service with correct urls', () => {
  gmapsApi.getPlacesAutocomplete(
    'testinput',
    { latitude: 50, longitude: 10 },
    'random_session_token'
  );

  expect(mockAxios.get).toHaveBeenCalledWith(
    'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=testinput&location=50,10&radius=100000&key=mock_gmaps_api_key&session_token=random_session_token'
  );
});

it('should call autocomplete and return data', () => {
  const catchFn = jest.fn(),
    thenFn = jest.fn();
  gmapsApi
    .getPlacesAutocomplete(
      'testinput',
      { latitude: 50, longitude: 10 },
      'random_session_token'
    )
    .then(thenFn)
    .catch(catchFn);

  const mock_response = {
    data: {
      status: 'OK',
      predictions: [
        {
          description: 'Paris, France',
          id: '691b237b0322f28988f3ce03e321ff72a12167fd',
          matched_substrings: [
            {
              length: 5,
              offset: 0
            }
          ],
          place_id: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ',
          reference:
            'CjQlAAAA_KB6EEceSTfkteSSF6U0pvumHCoLUboRcDlAH05N1pZJLmOQbYmboEi0SwXBSoI2EhAhj249tFDCVh4R-PXZkPK8GhTBmp_6_lWljaf1joVs1SH2ttB_tw',
          terms: [
            {
              offset: 0,
              value: 'Paris'
            },
            {
              offset: 7,
              value: 'France'
            }
          ],
          types: ['locality', 'political', 'geocode']
        }
      ]
    }
  };
  mockAxios.mockResponse(mock_response);

  expect(thenFn).toHaveBeenCalled();
  expect(thenFn.mock.calls).toHaveLength(1);
  const result = thenFn.mock.calls[0][0];
  expect(Array.isArray(result)).toBe(true);
  expect(result[0].id).toBe(mock_response.data.predictions[0].id);
  expect(catchFn).not.toHaveBeenCalled();
});

it('should call place details service with correct urls', () => {
  gmapsApi.getPlaceDetails('12345', 'random_session_token');

  expect(mockAxios.get).toHaveBeenCalledWith(
    'https://maps.googleapis.com/maps/api/place/details/json?placeid=12345&key=mock_gmaps_api_key&session_token=random_session_token'
  );
});

it('should call place details service and return correct data', () => {
  const catchFn = jest.fn(),
    thenFn = jest.fn();
  gmapsApi
    .getPlaceDetails('12345', 'random_session_token')
    .then(thenFn)
    .catch(catchFn);

  const mock_response = {
    data: {
      status: 'OK',
      html_attributions: [],
      result: {
        address_components: [
          {
            long_name: '5',
            short_name: '5',
            types: ['floor']
          },
          {
            long_name: '48',
            short_name: '48',
            types: ['street_number']
          },
          {
            long_name: 'Pirrama Road',
            short_name: 'Pirrama Rd',
            types: ['route']
          },
          {
            long_name: 'Pyrmont',
            short_name: 'Pyrmont',
            types: ['locality', 'political']
          },
          {
            long_name: 'Council of the City of Sydney',
            short_name: 'Sydney',
            types: ['administrative_area_level_2', 'political']
          },
          {
            long_name: 'New South Wales',
            short_name: 'NSW',
            types: ['administrative_area_level_1', 'political']
          },
          {
            long_name: 'Australia',
            short_name: 'AU',
            types: ['country', 'political']
          },
          {
            long_name: '2009',
            short_name: '2009',
            types: ['postal_code']
          }
        ],
        adr_address:
          '5, \u003cspan class="street-address"\u003e48 Pirrama Rd\u003c/span\u003e, \u003cspan class="locality"\u003ePyrmont\u003c/span\u003e \u003cspan class="region"\u003eNSW\u003c/span\u003e \u003cspan class="postal-code"\u003e2009\u003c/span\u003e, \u003cspan class="country-name"\u003eAustralia\u003c/span\u003e',
        formatted_address: '5, 48 Pirrama Rd, Pyrmont NSW 2009, Australia',
        formatted_phone_number: '(02) 9374 4000',
        geometry: {
          location: {
            lat: -33.866651,
            lng: 151.195827
          },
          viewport: {
            northeast: {
              lat: -33.8653881697085,
              lng: 151.1969739802915
            },
            southwest: {
              lat: -33.86808613029149,
              lng: 151.1942760197085
            }
          }
        },
        icon:
          'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
        id: '4f89212bf76dde31f092cfc14d7506555d85b5c7',
        international_phone_number: '+61 2 9374 4000',
        name: 'Google',
        place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
        rating: 4.5,
        reference:
          'CmRSAAAAjiEr2_A4yI-DyqGcfsceTv-IBJXHB5-W3ckmGk9QAYk4USgeV8ihBcGBEK5Z1w4ajRZNVAfSbROiKbbuniq0c9rIq_xqkrf_3HpZzX-pFJuJY3cBtG68LSAHzWXB8UzwEhAx04rgN0_WieYLfVp4K0duGhTU58LFaqwcaex73Kcyy0ghYOQTkg',
        reviews: [
          {
            author_name: 'Robert Ardill',
            author_url:
              'https://www.google.com/maps/contrib/106422854611155436041/reviews',
            language: 'en',
            profile_photo_url:
              'https://lh3.googleusercontent.com/-T47KxWuAoJU/AAAAAAAAAAI/AAAAAAAAAZo/BDmyI12BZAs/s128-c0x00000000-cc-rp-mo-ba1/photo.jpg',
            rating: 5,
            relative_time_description: 'a month ago',
            text:
              'Awesome offices. Great facilities, location and views. Staff are great hosts',
            time: 1491144016
          }
        ],
        scope: 'GOOGLE',
        types: ['point_of_interest', 'establishment'],
        url: 'https://maps.google.com/?cid=10281119596374313554',
        utc_offset: 600,
        vicinity: '5, 48 Pirrama Road, Pyrmont',
        website: 'https://www.google.com.au/about/careers/locations/sydney/'
      }
    }
  };
  mockAxios.mockResponse(mock_response);

  expect(thenFn).toHaveBeenCalled();
  expect(thenFn.mock.calls).toHaveLength(1);
  const result = thenFn.mock.calls[0][0];
  expect(result).toBeTruthy();
  expect(result.id).toBe(mock_response.data.result.id);
  expect(catchFn).not.toHaveBeenCalled();
});

it('should call route service with correct urls', () => {
  gmapsApi.getRoute(
    { latitude: 50, longitude: 10 },
    { latitude: 51, longitude: 11 }
  );

  expect(mockAxios.get).toHaveBeenCalledWith(
    'https://maps.googleapis.com/maps/api/directions/json?origin=50,10&destination=51,11&mode=bicycling&units=metric&key=mock_gmaps_api_key'
  );
});

it('should call route service with waypoints', () => {
  gmapsApi.getRoute(
    { latitude: 50, longitude: 10 },
    { latitude: 51, longitude: 11 },
    [{ latitude: 50.1, longitude: 12.1 }, { latitude: 50.3, longitude: 12.2 }]
  );

  expect(mockAxios.get).toHaveBeenCalledWith(
    'https://maps.googleapis.com/maps/api/directions/json?origin=50,10&destination=51,11&waypoints=50.1,12.1|50.3,12.2&mode=bicycling&units=metric&key=mock_gmaps_api_key'
  );
});

it('should call route service and return correct results', () => {
  const catchFn = jest.fn(),
    thenFn = jest.fn();
  gmapsApi
    .getRoute({ latitude: 50, longitude: 10 }, { latitude: 51, longitude: 11 })
    .then(thenFn)
    .catch(catchFn);

  const mock_response = {
    data: {
      status: 'OK',
      geocoded_waypoints: [
        {
          geocoder_status: 'OK',
          place_id: 'ChIJRVY_etDX3IARGYLVpoq7f68',
          types: [
            'bus_station',
            'transit_station',
            'point_of_interest',
            'establishment'
          ]
        },
        {
          geocoder_status: 'OK',
          partial_match: true,
          place_id: 'ChIJp2Mn4E2-woARQS2FILlxUzk',
          types: ['route']
        }
      ],
      routes: [
        {
          bounds: {
            northeast: {
              lat: 34.1330949,
              lng: -117.9143879
            },
            southwest: {
              lat: 33.8068768,
              lng: -118.3527671
            }
          },
          copyrights: 'Map data ©2016 Google',
          legs: [
            {
              distance: {
                text: '35.9 mi',
                value: 57824
              },
              duration: {
                text: '51 mins',
                value: 3062
              },
              end_address: 'Universal Studios Blvd, Los Angeles, CA 90068, USA',
              end_location: {
                lat: 34.1330949,
                lng: -118.3524442
              },
              start_address:
                'Disneyland (Harbor Blvd.), S Harbor Blvd, Anaheim, CA 92802, USA',
              start_location: {
                lat: 33.8098177,
                lng: -117.9154353
              }
            }
          ],
          overview_polyline: {
            points:
              'knjmEnjunUbKCfEA?_@]@kMBeE@qIIoF@wH@eFFk@WOUI_@?u@j@k@`@EXLTZHh@Y`AgApAaCrCUd@cDpDuAtAoApA{YlZiBdBaIhGkFrDeCtBuFxFmIdJmOjPaChDeBlDiAdD}ApGcDxU}@hEmAxD}[tt@yNb\\yBdEqFnJqB~DeFxMgK~VsMr[uKzVoCxEsEtG}BzCkHhKWh@]t@{AxEcClLkCjLi@`CwBfHaEzJuBdEyEhIaBnCiF|K_Oz\\{MdZwAbDaKbUiB|CgCnDkDbEiE|FqBlDsLdXqQra@kX|m@aF|KcHtLm@pAaE~JcTxh@w\\`v@gQv`@}F`MqK`PeGzIyGfJiG~GeLhLgIpIcE~FsDrHcFfLqDzH{CxEwAbBgC|B}F|DiQzKsbBdeA{k@~\\oc@bWoKjGaEzCoEzEwDxFsUh^wJfOySx[uBnCgCbCoFlDmDvAiCr@eRzDuNxC_EvAiFpCaC|AqGpEwHzFoQnQoTrTqBlCyDnGmCfEmDpDyGzGsIzHuZzYwBpBsC`CqBlAsBbAqCxAoBrAqDdDcNfMgHbHiPtReBtCkD|GqAhBwBzBsG~FoAhAaCbDeBvD_BlEyM``@uBvKiA~DmAlCkA|B}@lBcChHoJnXcB`GoAnIS~CIjFDd]A|QMlD{@jH[vAk@`CoGxRgPzf@aBbHoB~HeMx^eDtJ}BnG{DhJU`@mBzCoCjDaAx@mAnAgCnBmAp@uAj@{Cr@wBPkB@kBSsEW{GV}BEeCWyAWwHs@qH?cIHkDXuDn@mCt@mE`BsH|CyAp@}AdAaAtAy@lBg@pCa@jE]fEcBhRq@pJKlCk@hLFrB@lD_@xCeA`DoBxDaHvM_FzImDzFeCpDeC|CkExDiJrHcBtAkDpDwObVuCpFeCdHoIl\\uBjIuClJsEvMyDbMqAhEoDlJ{C|J}FlZuBfLyDlXwB~QkArG_AnDiAxC{G|OgEdLaE`LkBbEwG~KgHnLoEjGgDxCaC`BuJdFkFtCgCnBuClD_HdMqEzHcBpB_C|BuEzCmPlIuE|B_EtDeBhCgAdCw@rCi@|DSfECrCAdCS~Di@jDYhA_AlC{AxCcL`U{GvM_DjFkBzBsB`BqDhBaEfAsTvEmEr@iCr@qDrAiFnCcEzCaE~D_@JmFdGQDwBvCeErEoD|BcFjC}DbEuD~D`@Zr@h@?d@Wr@}@vAgCbEaHfMqA`Cy@dAg@bAO`@gCi@w@W'
          },
          summary: 'I-5 N and US-101 N',
          warnings: [],
          waypoint_order: []
        }
      ]
    }
  };
  mockAxios.mockResponse(mock_response);

  expect(thenFn).toHaveBeenCalled();
  expect(thenFn.mock.calls).toHaveLength(1);
  const result = thenFn.mock.calls[0][0];
  const route = result.route;
  expect(Array.isArray(route)).toBeTruthy();
  expect(route.length).toBeGreaterThan(0);
  expect(route[0].latitude).toBeDefined();
  expect(route[0].longitude).toBeDefined();
  const distance = result.distance;
  expect(distance).toBe(57824);
  const duration = result.duration;
  expect(duration).toBe(3062);
  expect(catchFn).not.toHaveBeenCalled();
});
