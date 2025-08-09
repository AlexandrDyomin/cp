import { startTransaction } from "./db";

export function updateCoin(req, coin, delta) {
    let wallet = startTransaction(req, 'wallet', 'readwrite');
    let coinIndex = wallet.index('coinIdx');
    let getRequest = coinIndex.get(coin);
    getRequest.onsuccess = () => {
        let result = getRequest.result;
        if (result) {
            result.amount += delta;
        } else {
            result = { 
                coin,
                amount: delta
            };
        }
        return wallet.put(result);
    }
}