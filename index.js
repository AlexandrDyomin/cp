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
import { getTradingStatistics } from './getTradingStatistics.js';
import { CustomPnLRow } from './Pairs_row.js';


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

let btn = document.querySelector('.sort-btn');
let sortFn = sortTable();

(async () => {
    // получим анализ торговли
    let data = await getTradingStatistics();
    // посчитаем профит и отобразим результат
    let invested = 0;
    let profit = 0;
    let profitPercent;
    let balanceInvested = document.querySelector('.balance__invested');
    let balanceProfit = document.querySelector('.balance__profit');
    Promise.allSettled(data)
        .then((data) => {
            for (let item of data) {
                let pair = item.value;
                invested += pair.total.invested;
                profit += pair.total.profit;
            };
            profitPercent = (profit / invested * 100) || 0;
            balanceInvested.textContent = invested.toFixed(2);
            balanceProfit.textContent = `${profit.toFixed(2)}(${profitPercent.toFixed(2)}%)`;
            // стилизуем профит
            if (profit < 0) {
                balanceProfit.classList.add('balance__profit_red');
            }
        });
})();

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

btn.addEventListener('click', () => {
    let rows = table.querySelectorAll('tr[is=custom-tr]');
    balanceValue.textContent = '';
    sortFn(
        table,
        rows, 
        (a, b) => +b.children[4].textContent - +a.children[4].textContent, 
        (a, b) => +a.children[4].textContent - +b.children[4].textContent
    );
});
