import { openDB, type DBSchema } from "idb";

interface BgDB extends DBSchema {
  backgrounds: {
    key: string,
    value: {
      id: string,
      blob: Blob,
      name: string,
      createdAt: number
    }
  }
}

export const dbPromise = openDB<BgDB>('backgrounds', 1, {
  upgrade(db) {
    if(!db.objectStoreNames.contains('backgrounds')) {
      db.createObjectStore('backgrounds', { keyPath: 'id' })
    }
  }
})

export const saveBg = async (file: File)=> {
  const db = await dbPromise;
  await db.put('backgrounds', {
    id: 'custom-wallpaper',
    blob: file,
    name: file.name,
    createdAt: Date.now()
  })
}