const fakePlacesAutocompleteData = [
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
];

export function getPlacesAutocomplete() {
  return new Promise(resolve => {
    resolve(fakePlacesAutocompleteData);
  });
}

const fakeRouteData = {
  distance: 70,
  duration: 100,
  route: [
    {
      latitude: 50,
      longitude: 10
    },
    {
      latitude: 51,
      longitude: 11
    }
  ]
};

export function getRoute() {
  return new Promise(resolve => {
    resolve(fakeRouteData);
  });
}

const fakePlaceDetailData = {
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
};
export function getPlaceDetails() {
  return new Promise(resolve => {
    resolve(fakePlaceDetailData);
  });
}
