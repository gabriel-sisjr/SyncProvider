import {Dispatch} from 'react';
import {MMKV} from 'react-native-mmkv';
import {KEY_STORAGE} from '../@types/ProviderTypes';

const Acessors = <T>(setData: Dispatch<T[]>) => {
  const mmkvStorage = new MMKV();

  const getItem = (): T[] | null => {
    const content = mmkvStorage.getString(KEY_STORAGE);
    if (!content) {
      return null;
    }

    const parsed = JSON.parse(content) as T[];
    return parsed;
  };

  const setItem = (value: T[]): void => {
    mmkvStorage.set(KEY_STORAGE, JSON.stringify(value));
    setData(value);
  };

  const countItems = (): number => {
    return mmkvStorage.getAllKeys().length;
  };

  const contains = (): boolean => {
    return mmkvStorage.contains(KEY_STORAGE);
  };

  const removeItem = (): void => {
    mmkvStorage.delete(KEY_STORAGE);
    // TODO
    // const cleanedObj = Object.keys(key)
    //   .filter(objKey => objKey !== key)
    //   .reduce((newObj: T, k: string) => {
    //     newObj[k] = data[k];
    //     return newObj;
    //   }, {} as unknown as T);

    // setData(cleanedObj);
  };

  const removeAll = (): void => {
    mmkvStorage.clearAll();
    setData([] as T[]);
  };

  const storage = {
    getItem,
    setItem,
    countItems,
    contains,
    removeItem,
    removeAll,
  };

  return storage;
};

export default Acessors;
