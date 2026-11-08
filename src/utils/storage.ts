import { storage } from "#imports";
import type { PersistStorage } from "zustand/middleware";
import type { StorageValue } from "zustand/middleware";

const STORAGE_AREA = ['local', 'session', 'sync', 'managed'] as const;

type storageArea = typeof STORAGE_AREA[number];

const wxtStorage = <T>(storageArea: storageArea): PersistStorage<T>=> ({
  getItem: (name)=> storage.getItem<StorageValue<T>>(`${storageArea}:${name}`),
  setItem: (name, value)=> storage.setItem<StorageValue<T>>(`${storageArea}:${name}`,value),
  removeItem: (name)=> storage.removeItem(`${storageArea}:${name}`),
})

export const wxtLocalStorage = <T>()=> wxtStorage<T>('local');
export const wxtSessionStorage = <T>()=> wxtStorage<T>('session');
export const wxtSyncStorage = <T>()=> wxtStorage<T>('sync');
export const wxtManagedStorage = <T>()=> wxtStorage<T>('managed');
