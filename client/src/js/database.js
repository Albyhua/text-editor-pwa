import { openDB } from 'idb';

const initdb = async () => //create db
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1); // opens db
  const tx = jateDb.transaction('jate', 'readwrite'); // create transactions
  const store = tx.objectStore('jate'); // identify what table to use
  const request = store.put({id:1, value:content}); //puts data into the storage
  // post would overwrite, put UPDATES 
  const result = await request; 
  // could be await store.put({id:1, value:content}); as well
  tx.onerror = () => console.log("PROBLEM!!!");
  console.log(result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);

 const tx = jateDb.transaction('jate', 'readonly');

 const store = tx.objectStore('jate');

 const request = store.get(1);

 const result = await request;
 console.log('result.value', result);
 return result?.value;
};

initdb();
