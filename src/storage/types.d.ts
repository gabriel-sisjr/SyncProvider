export interface StoreService {
  getItem: <T>(key: string) => T | null;
  setItem: <T>(key: string, value: T) => void;
  countItems: () => number;
  contains: (key: string) => boolean;
  removeItem: (key: string) => void;
  removeAll: () => void;
}
