import {NetInfoState} from '@react-native-community/netinfo';
import {ReactNode} from 'react';

export interface StorageItem {
  data: any;
  urlEndpoint: string;
}

export interface IPropsProvider {
  children: ReactNode;
}

export interface ConnectionContextData {
  netInfoState: NetInfoState | null;
  isSync: boolean;
  itemsCount: number;
  storage: () => {
    getItem: () => StorageItem[] | null;
    setItem: (value: StorageItem[]) => void;
    countItems: () => number;
    contains: () => boolean;
    removeItem: () => void;
    removeAll: () => void;
  };
}

export const KEY_STORAGE = '@@OFFLINE_STORAGE_ITEMS@@';
