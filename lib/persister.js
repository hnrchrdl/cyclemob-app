import { AsyncStorage } from 'react-native';

const APP_ID = '@CycleMobApp';
const STORAGE_KEYS = {
  recentSearchResults: 'recentSearchResults'
};

/**
 * Saves a search result to the list of recent search results.
 *
 * @description
 * New elements will be added first in list.
 * If an element already exists, it will be wiped from the list first.
 * Max amount of elements in list is 10.
 *
 * @param {*} search result item
 */
const saveRecentSearchResult = async item => {
  const storageId = `${APP_ID}:${STORAGE_KEYS.recentSearchResults}`;
  try {
    const itemsCurrent = await getRecentSearchResults();
    const itemsToSave = [
      item,
      ...itemsCurrent.filter(_item => _item.place_id !== item.place_id)
    ].slice(0, 10);
    await AsyncStorage.setItem(storageId, JSON.stringify(itemsToSave));
  } catch (error) {
    console.error(error);
    // Error saving data
  }
};

/**
 * Returns the list of recent searches
 *
 * @returns Promise of search result items
 */
const getRecentSearchResults = async () => {
  const storageId = `${APP_ID}:${STORAGE_KEYS.recentSearchResults}`;
  try {
    const itemsRaw = await AsyncStorage.getItem(storageId);
    return itemsRaw !== null ? JSON.parse(itemsRaw) : [];
  } catch (error) {
    console.error(error);
    // Error saving data
  }
};

const clearRecentSearchResults = async () => {
  const storageId = `${APP_ID}:${STORAGE_KEYS.recentSearchResults}`;
  try {
    await AsyncStorage.removeItem(storageId);
  } catch (error) {
    console.error(error);
    // Error saving data
  }
};

export {
  saveRecentSearchResult,
  getRecentSearchResults,
  clearRecentSearchResults
};
