import * as persister from '../lib/persister';
import MockAsyncStorage from 'mock-async-storage';

const mockSearchResults = [
  {
    place_id: '1234'
  },
  {
    place_id: '5678'
  }
];

const mock = () => {
  const mockImpl = new MockAsyncStorage();
  jest.mock('AsyncStorage', () => mockImpl);
};

it('should persist a new search result item', done => {
  mock();
  persister.saveRecentSearchResult(mockSearchResults[0]).then(() => {
    persister.getRecentSearchResults().then(results => {
      expect(true).toBeTruthy();
      expect(results).toBeDefined();
      expect(results[0]).toEqual(mockSearchResults[0]);
      done();
    });
  });
});

it('should not persist duplicates', done => {
  mock();
  persister.saveRecentSearchResult(mockSearchResults[0]).then(() => {
    persister.saveRecentSearchResult(mockSearchResults[0]).then(() => {
      persister.getRecentSearchResults().then(results => {
        expect(results).toHaveLength(1);
        done();
      });
    });
  });
});

it('should not persist more than 10 items', done => {
  mock();
  persister.saveRecentSearchResult({ place_id: 1 }).then(() => {
    persister.saveRecentSearchResult({ place_id: 2 }).then(() => {
      persister.saveRecentSearchResult({ place_id: 3 }).then(() => {
        persister.saveRecentSearchResult({ place_id: 4 }).then(() => {
          persister.saveRecentSearchResult({ place_id: 5 }).then(() => {
            persister.saveRecentSearchResult({ place_id: 6 }).then(() => {
              persister.saveRecentSearchResult({ place_id: 7 }).then(() => {
                persister.saveRecentSearchResult({ place_id: 8 }).then(() => {
                  persister.saveRecentSearchResult({ place_id: 9 }).then(() => {
                    persister
                      .saveRecentSearchResult({ place_id: 10 })
                      .then(() => {
                        persister
                          .saveRecentSearchResult({ place_id: 11 })
                          .then(() => {
                            persister
                              .saveRecentSearchResult({ place_id: 12 })
                              .then(() => {
                                persister
                                  .getRecentSearchResults()
                                  .then(results => {
                                    expect(results).toHaveLength(10);
                                    done();
                                  });
                              });
                          });
                      });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
