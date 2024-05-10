import React, {createContext, useCallback, useEffect, useState} from 'react';

import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import Acessors from '../Utils/Acessors';
import {
  ConnectionContextData,
  IPropsProvider,
  StorageItem,
} from '../@types/ProviderTypes';

export const ConnectionContext = createContext<ConnectionContextData>(
  {} as ConnectionContextData,
);

export const ConnectionProvider: React.FC<IPropsProvider> = ({children}) => {
  const [netInfoState, setNetInfoState] = useState<NetInfoState>(
    {} as NetInfoState,
  );

  const [isSync, setIsSync] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);
  const [data, setData] = useState<StorageItem[]>([] as StorageItem[]);

  // Acessors
  const storage = useCallback(() => {
    const acessors = Acessors<StorageItem>(setData);
    setItemsCount(data.length);

    return acessors;
  }, [setData, data.length]);

  const checkEndpoint = () => {
    const success = fetch('https://google.com.br')
      .then(r => r)
      .catch(err => err);

    return success;
  };

  const uploadItems = (storageItem: StorageItem[], url: string) => {
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
        resolve({storageItem, url});
      }, 300);
    });

    return response;
  };

  const syncItems = useCallback(
    (netInfo: NetInfoState) => {
      if (netInfo.isConnected && netInfo.isInternetReachable) {
        if (storage().contains()) {
          // ping
          checkEndpoint().then(() => {
            // start upload
            const storageData = storage().getItem();

            if (storageData) {
              uploadItems(storageData, 'url')
                .then(() => {
                  storage().removeItem();
                  const count = storage().countItems();
                  setItemsCount(count);
                  const sync = count === 0;
                  setIsSync(sync);
                })
                .catch(err => JSON.stringify(err, null, 2));
            }
          });
        }
      }
    },
    [storage],
  );

  const listenerCallBack = useCallback(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const sync = storage().countItems() === 0;
      setIsSync(sync);
      setNetInfoState(state);
      setItemsCount(storage().countItems());
      syncItems(state);
    });

    return () => {
      unsubscribe();
    };
  }, [syncItems, storage]);

  useEffect(() => {
    listenerCallBack();
  }, [listenerCallBack]);

  useEffect(() => {
    console.log(JSON.stringify(data, null, 2));
  }, [data]);

  return (
    <ConnectionContext.Provider
      value={{netInfoState, isSync, itemsCount, storage}}>
      {children}
    </ConnectionContext.Provider>
  );
};
