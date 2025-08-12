import './navigation/navigation.js';
import './deposit/deposit.js';
import './edit_btn/handleClickEditBalanceBtn.js';
import './new_coin_modal/new_coin_modal.js';
import './delete_btn/delete_btn.js';
import { connectDB, makeReadAllRecords, readAllStores } from './db.js';
import { renderRows } from './renderRows.js';
import { CustomTR } from './coins_row.js';
import { uploadData } from './db.js';

let table = document.querySelector('.coins');
connectDB(makeReadAllRecords('wallet', (data) => renderRows(table, data, (item) => new CustomTR(item))));

document.addEventListener('coin-added', increaseBalance);
document.addEventListener('coin-changed', recalcBalance);
document.addEventListener('coin-deleted', decreaseBalance);

let balanceValue = document.querySelector('.balance__value');

function increaseBalance(e) {
    let { totalPrice } = e.detail;
    let balance = +balanceValue.textContent;
    balance = (balance + totalPrice).toFixed(2);
    balanceValue.textContent = balance;
}

function recalcBalance(e) {
    balanceValue.textContent = (+balanceValue.textContent + e.detail.delta).toFixed(2);
}

function decreaseBalance(e) {
    balanceValue.textContent = (+balanceValue.textContent - e.detail.totalPrice).toFixed(2);
}

// connectDB(async (req) => {
//     let result = await readAllStores(req);
//     console.log(result)
// })

// let d = {
//     wallet: [
//         {coin: 'usdt', amount: -2, id: 133}
//     ],
//     transactions: [
//         { date: '2025-08-14T18:16', 
//             transactionType: 'Покупка',
//             pair: 'crv/usdt', 
//             amount: 1, 
//             price: 2, 
//             transactionType: "Покупка"
//         }
//     ]
// }

// connectDB((req) => {
//     uploadData(req, d);
//     console.log('done')
// })