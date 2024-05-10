# Connection Provider

This is a React component that provides information about the network connection state and functionalities related to data synchronization with a remote server. Data is saved via MMKV and synchronized as soon as the network connection is established.

## Features

- **Network Connection Monitoring**: This provider monitors the device's network connection state.
- **Automatic Synchronization**: When a network connection is available, the provider automatically initiates data synchronization with a remote server.
- **Synchronization Control**: Provides indicators and counters to track the progress of data synchronization.

## Usage

To use this connection provider, you can wrap your application components with the `ConnectionProvider` and access the information and functionalities provided by the `ConnectionContext` context.

Usage example:

```ts
import React from 'react';
import {ConnectionProvider} from 'path/to/ConnectionProvider';
import {ConnectionProviderConfiguration} from 'path/to/@types/ProviderTypes';
import YourRouteComponent from './YourRouteComponent';

const configuration: ConnectionProviderConfiguration = {
  baseUrl: 'my-host.com',
  healthEndpoint: '/health',
};

const App = () => {
  return (
    <ConnectionProvider connectionProviderConfiguration={configuration}>
      <YourRouteComponent />
    </ConnectionProvider>
  );
};

export default App;
```

To integrate the ConnectionProvider into your React Native application, follow these steps:

1. Install the `@react-native-community/netinfo` and `react-native-mmkv` libraries.
2. Ensure to properly configure the `connectionProviderConfiguration` for your application.
3. Import the `ConnectionProvider` and wrap your application components with it.
4. Access the information and functionalities provided by the `ConnectionContext` context.

## API

### ConnectionProvider

- **Props**:
  - `connectionProviderConfiguration`: Configuration for the connection provider.

### ConnectionContext

- **Data and Functionalities**:
  - `netInfoState`: Network connection state.
  - `isSync`: Synchronization indicator.
  - `itemsCount`: Count of items to be synchronized.
  - `storage`: Functionalities related to data manipulation.

## Internal Features

In addition to the main functionalities, the provider also offers additional internal features:

- **Accessors**: Provides access to data storage operations.
- **checkEndpoint**: Checks if the health endpoint is accessible.
- **uploadItems**: Sends items to the remote server.
- **syncItems**: Synchronizes items when the connection is available.
- **listenerCallBack**: Callback to listen for changes in the network connection state.

## Contribution

Contributions are welcome! Feel free to open issues and submit pull requests with improvements. Make sure to follow the contribution guidelines.

## Social Media

You can find us on the following social media platforms:

- LinkedIn: [Gabriel Santana](https://www.linkedin.com/in/gabriel-sisjr/)

Follow us to stay updated on the project and engage in discussions!

<!-- ## Donations

If you would like to financially support this project, consider making a donation through the following means:

- [Patreon](https://www.patreon.com/examplerepo)
- [PayPal](https://www.paypal.com/donate?hosted_button_id=YOUR_BUTTON_ID)
- Bitcoin: `YOUR_BITCOIN_WALLET` -->
