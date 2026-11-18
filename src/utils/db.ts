import { openDB, type DBSchema } from "idb";

export interface Bg {
  id: string,
  blob: Blob,
  name: string,
  createdAt: number
}

interface BgDB extends DBSchema {
  backgrounds: {
    key: string,
    value: Bg,
  }
}

export const dbPromise = openDB<BgDB>('bgDb', 1, {
  upgrade(db) {
    db.createObjectStore('backgrounds', { keyPath: 'id', autoIncrement: true })
  }
})

export const addBg = async (file: File)=> {
  const db = await dbPromise;
  return await db.add('backgrounds', {
    id: crypto.randomUUID(),
    blob: file,
    name: file.name,
    createdAt: Date.now(),
  })
}
export const getAllBg = async ()=> {
  const db = await dbPromise;
  const bgs = await db.getAll('backgrounds');
  return bgs;
}
export const deleteBg = async (key: BgDB['backgrounds']['key'])=> {
  const db = await dbPromise;
  await db.delete('backgrounds', key);
}
export const getBg = async (key: BgDB['backgrounds']['key'])=> {
  const db = await dbPromise;
  const bg = await db.get('backgrounds', key);
  return bg;
}