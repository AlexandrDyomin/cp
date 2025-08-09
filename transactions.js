import './add_transaction_btn/add_transaction_btn.js';
import './transaction_modal/transaction_modal.js';
import './navigation/navigation.js';
import './edit_btn/handleClickEditTransactionBtn.js';
import './transaction-row.js';
import './delete_btn/delete_btn.js';
import { connectDB, makeReadAllRecords, startTransaction } from './db.js';
import { renderRows } from './renderRows.js';
import { CustomBody } from './transaction-row.js';

let table = document.querySelector('.transactions');
connectDB(makeReadAllRecords('transactions', (data) => {
    renderRows(table, data, (item) => new CustomBody(item));
}));

document.addEventListener('transaction-changed', recalcWallet);

function recalcWallet(e) {
    let { oldData, newData } = e.detail;
    connectDB(updateWallet);
    function updateWallet(req) {
        let wallet = startTransaction(req, 'wallet', 'readwrite');
        let coinIndex = wallet.index('coinIdx');
        let oldCoins = oldData.pair?.split('/');
        let newCoins = newData.pair?.split('/');
    
        if (oldData.transactionType === 'Покупка') {
            Promise.all([
                updateCoin(oldCoins[0], -1 * oldData.amount),
                updateCoin(oldCoins[1], oldData.total)
            ]).then(() => {
                if (newData.transactionType === 'Покупка') {
                    updateCoin(newCoins[0], newData.amount);
                    updateCoin(newCoins[1], -1 * newData.total);
                    return;
                }
                if (newData.transactionType === 'Продажа') {
                    updateCoin(newCoins[0], -1 * newData.amount);
                    updateCoin(newCoins[1], newData.total);
                    return;
                }
            });
            return;
        } 

        if(oldData.transactionType === 'Продажа') {
            Promise.all([
                updateCoin(oldCoins[0], oldData.amount),
                updateCoin(oldCoins[1], -1 * oldData.total)
            ]).then(() => {
                if (newData.transactionType === 'Продажа') {
                    updateCoin(newCoins[0], -1 * newData.amount);
                    updateCoin(newCoins[1], newData.total);
                    return;
                }
                if (newData.transactionType === 'Покупка') {
                    updateCoin(newCoins[0], newData.amount);
                    updateCoin(newCoins[1], -1 * newData.total);
                }
            });
            return;
        }
        
        function updateCoin(coin, delta) {
            return new Promise((resolve, reject) => {
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
                    let updateRequest = wallet.put(result);
                    updateRequest.onsuccess = () => resolve(updateRequest)
                    updateRequest.onerror = () => reject(updateRequest.error);
                }
            });
        }
    }   
}

