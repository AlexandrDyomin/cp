import './navigation/navigation.js';
import './deposit/deposit.js';
import './edit_btn/handleClickEditBalanceBtn.js';
import './new_coin_modal/new_coin_modal.js';
import './delete_btn/delete_btn.js';
import { connectDB, makeReadAllRecords } from './db.js';
import { renderRows } from './renderRows.js';
import { CustomTR } from './Coins_row.js';
import './download_btn.js';
import { sortTable } from './sort_btn/sort_btn.js';

let table = document.querySelector('.coins');
connectDB(makeReadAllRecords('wallet', (data) => {
    let sortedCoins = [...data].sort((a, b) => 
        new Date(b.amount) - new Date(a.amount)
    );
    renderRows(
        table, 
        sortedCoins.filter(item => item.amount), 
        (item) => {
            if (item.coin === 'usdt') {
                return new CustomTR({ ...item, amount: item.amount.toFixed(2)});
            }
            return new CustomTR(item);
        }
    );
}));

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

let btn = document.querySelector('.sort-btn');
let sortFn = sortTable();

btn.addEventListener('click', () => {
    let rows = table.querySelectorAll('tr[is=custom-tr]');
    sortFn(
        table,
        rows, 
        (a, b) => +b.children[4].textContent - +a.children[4].textContent, 
        (a, b) => +a.children[4].textContent - +b.children[4].textContent
    );
})
