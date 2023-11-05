export const openIndexedDB = (name:string,keyPath:string) => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const openRequest: IDBOpenDBRequest = indexedDB.open('UserDataDB', 2);

    openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db: IDBDatabase = (event.target as any).result;
      db.createObjectStore(name, { keyPath: keyPath });
    };

    openRequest.onsuccess = (event: Event) => {
      const db: IDBDatabase = (event.target as any).result;
      resolve(db);
    };

    openRequest.onerror = (event: Event) => {
      reject(new Error('Failed to open IndexedDB'));
    };
  });
};

export const storeUserDetailsInIndexedDB = (userDetails: any, name:any, keyPath:string) => {
  openIndexedDB(name,keyPath)
    .then((db) => {
      const transaction = db.transaction(name, 'readwrite');
      const userDetailsStore = transaction.objectStore(name);
      userDetailsStore.add(userDetails);
    })
    .catch((error) => {
      console.error('Error storing user details in IndexedDB:', error);
    });
};

export const retrieveUserDetailsFromIndexedDB = (username: string,name:string,keyPath:string) => {
  return new Promise<any>((resolve, reject) => {
    openIndexedDB(name,keyPath)
      .then((db) => {
        const transaction = db.transaction(name, 'readonly');
        const userDetailsStore = transaction.objectStore(name);

        const getDetailsRequest = userDetailsStore.get(username);

        getDetailsRequest.onsuccess = () => {
          const storedUserDetails = getDetailsRequest.result;
          if (storedUserDetails) {
            resolve(storedUserDetails);
          } else {
            reject(new Error('User details not found in IndexedDB.'));
          }
        };

        getDetailsRequest.onerror = () => {
          reject(new Error('Failed to retrieve user details from IndexedDB.'));
        };
      })
      .catch((error) => {
        console.error('Error opening IndexedDB:', error);
        reject(error);
      });
  });
};