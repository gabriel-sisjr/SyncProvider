import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ConnectionProvider, useConnection} from './contexts/SyncProvider';

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

const data = [
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
  {
    guidIdMotorista: 'd9769158-9e70-4649-b74a-1d27f18b78fb',
    guidIdVeiculo: 'c14eba71-870b-4080-a5f9-dd8358db646a',
    latitude: 30.589787,
    longitude: 89.399602,
    registered: '2022-12-20',
  },
  {
    guidIdMotorista: 'c24d3d3e-d2c0-4264-b025-65a6d913089a',
    guidIdVeiculo: 'dc6e053d-cf31-4db0-a930-2201851b32df',
    latitude: 72.672646,
    longitude: 37.338174,
    registered: '2019-03-13',
  },
  {
    guidIdMotorista: '2f60140f-de0f-41bd-89ab-9691ca213f38',
    guidIdVeiculo: '3805d443-7fc0-43d4-989f-b17226444b81',
    latitude: -24.231941,
    longitude: 31.064566,
    registered: '2017-12-10',
  },
  {
    guidIdMotorista: '03ef3e45-eb7a-4f3d-ba92-82d9482b8179',
    guidIdVeiculo: 'b2101d24-ffd5-447a-830c-9afa861a06a9',
    latitude: -14.52628,
    longitude: 173.439283,
    registered: '2023-07-14',
  },
  {
    guidIdMotorista: '263bce62-0cf2-4d61-8143-f4f0cabe9184',
    guidIdVeiculo: 'e56f3d09-ed83-4ffc-92ea-112363482322',
    latitude: -46.951188,
    longitude: -57.895251,
    registered: '2016-01-16',
  },
  {
    guidIdMotorista: '0827272e-411e-4f59-b955-d35542099c13',
    guidIdVeiculo: '7d2bccca-b342-4972-988d-ce63b937dd15',
    latitude: 22.347019,
    longitude: -6.190379,
    registered: '2023-12-20',
  },
  {
    guidIdMotorista: 'bf40553d-2627-4cef-bba6-6d8e465bb0c4',
    guidIdVeiculo: '738a049c-6d23-45ca-92e0-ca006462a833',
    latitude: -8.304174,
    longitude: 72.442173,
    registered: '2020-12-19',
  },
  {
    guidIdMotorista: 'fd01bf30-7786-4f41-8c3c-2c5888f7f627',
    guidIdVeiculo: '172513f4-947e-4e47-ad35-523271034c9c',
    latitude: -51.236343,
    longitude: -40.388077,
    registered: '2017-12-13',
  },
];

const Home: React.FC = () => {
  const {netInfoState} = useConnection();
  const {isSync, itemsCount, storage} = useConnection();

  const addToStorage = () => storage.setItem('viagens', JSON.stringify(data));

  const clearAll = () => storage.removeAll();

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
    <ConnectionProvider>
      <Home />
    </ConnectionProvider>
  );
};

export default App;
