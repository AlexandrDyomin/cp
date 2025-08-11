export function connectDB(f = () => console.log('Соединение с БД установлено')) {
    let request = indexedDB.open('cp');
    request.onupgradeneeded = initDB;
    request.onsuccess = f;
    request.onerror = logerr;
   
    function initDB(e) {
        let db = e.target.result;
        let wallet = db.createObjectStore('wallet', { keyPath: 'id', autoIncrement: true});
        wallet.createIndex('coinIdx', 'coin', { unique: true });
        let transactions = db.createObjectStore('transactions', { keyPath: 'id', autoIncrement: true});
        transactions.createIndex('coinIdx', 'pair');
    }

    function logerr(e) {
        console.error("Error", e.target.error);
    }
}

export function makeReadAllRecords(store, f) {
    return (e) => {
        let wallet = startTransaction(e, store, 'readonly');

        let getRequest = wallet.getAll();
        getRequest.onsuccess = (e) => {
            let result = e.target.result;
            f(result);
        }
    }
}

export function startTransaction(e, store, type) {
    let db = e.target.result;
    let transaction = db.transaction(store, type);
    return transaction.objectStore(store);
}

export async function readAllStores(req) {
    let db = req.target.result;
    let storeNames = [...db.objectStoreNames];
    let promises = storeNames.map((name) => {
        return new Promise((resolve, reject) => {
            let transaction = startTransaction(req, name, 'readonly');
            let data = transaction.getAll();
            data.onsuccess = () => {
                resolve({[name]: data.result})
            };
            data.onerror = reject;


        });
    });
    return Promise.all(promises)
        .then((res) => {
            return res.reduce((acc, item) => {
                let storeName = Object.keys(item)[0];
                acc[storeName] = item[storeName];
                return acc;
            }, {});
        });
}