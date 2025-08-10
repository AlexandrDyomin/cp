import './navigation/navigation.js';
import './deposit/deposit.js';
import './edit_btn/handleClickEditBalanceBtn.js';
import './new_coin_modal/new_coin_modal.js';
import './delete_btn/delete_btn.js';
import { connectDB, makeReadAllRecords } from './db.js';
import { renderRows } from './renderRows.js';
import { CustomTR } from './coins_row.js';

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