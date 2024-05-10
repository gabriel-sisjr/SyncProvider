import React, {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';

import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {MMKV} from 'react-native-mmkv';

interface ConnectionContextData {
  netInfoState: NetInfoState | null;
  isSync: boolean;
  itemsCount: number;
  storage: {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    countItems: () => number;
    contains: (key: string) => boolean;
    removeItem: (key: string) => void;
    removeAll: () => void;
  };
}

interface IProps {
  children: ReactNode;
}

export const ConnectionContext = createContext<ConnectionContextData>(
  {} as ConnectionContextData,
);

export const ConnectionProvider: React.FC<IProps> = ({children}) => {
  const [netInfoState, setNetInfoState] = useState<NetInfoState>(
    {} as NetInfoState,
  );

  const mmkvStorage = useCallback(() => new MMKV(), []);

  const [isSync, setIsSync] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);
  const [data, setData] = useState<any>({} as any);

  // Acessors
  const getItem = useCallback(
    (key: string) => {
      const content = mmkvStorage().getString(key);
      if (!content) {
        return null;
      }

      return content;
    },
    [mmkvStorage],
  );

  const setItem = useCallback(
    (key: string, value: string) => {
      mmkvStorage().set(key, value);
      setData(value);
    },
    [mmkvStorage],
  );

  const countItems = useCallback(() => {
    return mmkvStorage().getAllKeys().length;
  }, [mmkvStorage]);

  const contains = useCallback(
    (key: string) => {
      return mmkvStorage().contains(key);
    },
    [mmkvStorage],
  );

  const removeItem = useCallback(
    (key: string) => {
      mmkvStorage().delete(key);
      const cleanedObj = Object.keys(key)
        .filter(objKey => objKey !== key)
        .reduce((newObj: any, k) => {
          newObj[k] = data[k];
          return newObj;
        }, {});

      setData(cleanedObj);
    },
    [mmkvStorage, data],
  );

  const removeAll = useCallback(() => {
    mmkvStorage().clearAll();
    setData({});
  }, [mmkvStorage]);
  // End Acessors

  const storage = {
    getItem,
    setItem,
    countItems,
    contains,
    removeItem,
    removeAll,
  };

  const checkEndpoint = () => {
    const success = fetch('https://google.com.br')
      .then(r => r)
      .catch(err => err);

    return success;
  };

  const syncItems = (jsonData: string, url: string) => {
    // const response = fetch(url, {
    //   method: 'POST',
    //   body: jsonData,
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    //   .then(r => r)
    //   .catch(err => err);
    const response = new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 300);
    });

    return response;
  };

  const syncItenss = useCallback(
    (netInfo: NetInfoState) => {
      if (netInfo.isConnected && netInfo.isInternetReachable) {
        if (contains('viagens')) {
          // ping
          checkEndpoint().then(() => {
            // start upload
            const items = getItem('viagens');

            syncItems(items!, 'url')
              .then(() => {
                removeItem('viagens');
                const count = countItems();
                setItemsCount(count);
                setIsSync(true);
              })
              .catch(err => JSON.stringify(err, null, 2));
          });
        }
      }
    },
    [contains, countItems, getItem, removeItem],
  );

  const listenerCallBack = useCallback(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsSync(false);
      setNetInfoState(state);
      setItemsCount(countItems());
      syncItenss(state);
    });

    return () => {
      unsubscribe();
    };
  }, [syncItenss, countItems]);

  useEffect(() => {
    listenerCallBack();
  }, [listenerCallBack]);

  useEffect(() => {}, [data]);

  return (
    <ConnectionContext.Provider
      value={{netInfoState, isSync, itemsCount, storage}}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const ctx = useContext(ConnectionContext);

  if (!ctx) {
    throw new Error('useConnection must be used within an AuthProvider.');
  }

  return ctx;
};
