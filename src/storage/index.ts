import {MMKV} from 'react-native-mmkv';

import {type StoreService} from './types';

const storage = new MMKV();

export const mmkvStorage: StoreService = {
  getItem: key => {
    const item = storage.getString(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  },

  setItem: (key, value) => {
    storage.set(key, JSON.stringify(value));
  },

  removeItem: key => {
    storage.delete(key);
  },

  countItems: () => {
    return storage.getAllKeys().length;
  },

  contains: key => {
    return storage.contains(key);
  },

  removeAll: () => {
    storage.clearAll();
  },
};
