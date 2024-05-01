export interface ConnectionType {
  details: CellularDetails | WifiDetails;
  isConnected: boolean;
  type: string;
  isInternetReachable: boolean;
  isWifiEnabled: boolean;
}

interface CellularDetails {
  cellularGeneration: string;
}

interface WifiDetails {
  cellularGeneration: string;
}
