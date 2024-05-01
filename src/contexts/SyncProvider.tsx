import React, {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';

import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {mmkvStorage} from '../storage';
import {Viagem} from '../@types/viagem';
import {StoreService} from '../storage/types';

interface ConnectionContextData {
  netInfoState: NetInfoState | null;
  isSync: boolean;
  itemsCount: number;
  storage: StoreService;
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

  const [isSync, setIsSync] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);
  const [storage] = useState(mmkvStorage);

  const checkEndpoint = () => {
    const success = fetch('https://google.com.br')
      .then(r => r)
      .catch(err => err);

    return success;
  };

  const syncItems = (jsonData: Viagem[], url: string) => {
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

  const syncItenss = useCallback((netInfo: NetInfoState) => {
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      if (mmkvStorage.contains('viagens')) {
        // ping
        checkEndpoint().then(() => {
          // start upload
          const items = mmkvStorage.getItem<Viagem[]>('viagens');

          syncItems(items!, 'url')
            .then(() => {
              mmkvStorage.removeItem('viagens');
              setItemsCount(mmkvStorage.countItems());
              setIsSync(true);
            })
            .catch(err => JSON.stringify(err, null, 2));
        });
      }
    }
  }, []);

  const listenerCallBack = useCallback(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsSync(false);
      setNetInfoState(state);
      setItemsCount(mmkvStorage.countItems());
      syncItenss(state);
    });

    return () => {
      unsubscribe();
    };
  }, [syncItenss]);

  useEffect(() => {
    listenerCallBack();
  }, [listenerCallBack]);

  useEffect(() => {}, [storage]);

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
