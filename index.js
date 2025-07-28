import './navigation/navigation.js';
import './deposit/deposit.js';
import './edit_btn/handleClickEditBalanceBtn.js';
import './new_coin_modal/new_coin_modal.js';
import './delete_btn/delete_btn.js';
import { connectDB, makeReadAllRecords } from './db.js';
import { renderRows } from './coins_table.js';

connectDB(makeReadAllRecords('wallet', renderRows));

document.addEventListener('total-price-resived', updateBalance);
document.addEventListener('total-price-changed', recalcBalance);
document.addEventListener('coin-deleted', subtractСost);

let balanceValue = document.querySelector('.balance__value');

function updateBalance(e) {
    let { totalPrice } = e.detail;
    let balance = +balanceValue.textContent;
    balance = (balance + totalPrice).toFixed(2);
    balanceValue.textContent = balance;
}

function recalcBalance() {
    let cellsTotalPrice = document.querySelectorAll('.coins__total-price');
    let balance = 0;
    cellsTotalPrice.forEach((data) => balance = +((balance + +data.textContent)).toFixed(2));
    balanceValue.textContent = balance;
}

function subtractСost(e) {
    balanceValue.textContent = (+balanceValue.textContent - +e.detail.totalPrice).toFixed(2);
}