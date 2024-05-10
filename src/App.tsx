import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ConnectionProvider} from './contexts/SyncProvider';
import {StorageItem} from './@types/ProviderTypes';
import {useConnection} from './Hooks/useConnection';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 30,
    height: 50,
    width: 130,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

const offlineData: StorageItem[] = [
  {
    data: [
      {
        guidIdMotorista: '7346aee8-62c6-452d-9084-9783f6a585dc',
        guidIdVeiculo: '2d3e4862-3a09-4eb7-9eb6-00c57c0eb80b',
        latitude: 61.640133,
        longitude: -148.234816,
        registered: '2015-11-01',
      },
      {
        guidIdMotorista: '4bff8a38-2353-4758-8568-b5d21f3ce00e',
        guidIdVeiculo: '3b68c86d-b854-48bd-9776-fb957451f131',
        latitude: 83.860506,
        longitude: 10.335275,
        registered: '2016-05-10',
      },
    ],
    urlEndpoint: 'Endpoint to Upload data',
  },
];

const Home: React.FC = () => {
  const {netInfoState, isSync, itemsCount, storage} = useConnection();

  const addToStorage = () => storage().setItem(offlineData);

  // const dataExample = () => storage().getItem();

  const clearAll = () => storage().removeAll();

  return (
    <View style={styles.container}>
      <Text>
        CONNECTION: {JSON.stringify(netInfoState?.isConnected, null, 2)}
      </Text>
      <TouchableOpacity onPress={addToStorage} style={styles.button}>
        <Text style={styles.buttonText}>ADD TO STORAGE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={clearAll} style={styles.button}>
        <Text style={styles.buttonText}>CLEAR STORAGE</Text>
      </TouchableOpacity>
      <Text>KEYS: {itemsCount}</Text>
      <Text>SYNC: {JSON.stringify(isSync)}</Text>
    </View>
  );
};

const App: React.FC = () => {
  return (
    <ConnectionProvider
      connectionProviderConfiguration={{
        healthEndpoint: 'https://google.com.br',
      }}>
      <Home />
    </ConnectionProvider>
  );
};

export default App;
