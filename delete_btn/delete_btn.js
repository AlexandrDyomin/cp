import { connectDB } from "../db";
import { updateCoin } from "../updateCoin";

let table = document.querySelector('.coins') || document.querySelector('.transactions');
table.addEventListener('click', deleteRow);

function deleteRow(e) {
    if (!e.target.closest('.delete-btn')) return;
    let record = e.target.closest('.coins__record') || e.target.closest('.transactions__record');
    if (record.className === 'transactions__record') {
        connectDB(recalcWallet);
        function recalcWallet(req) {
            let coins = record.dataset.pair.split('/');
            if (record.dataset.transactionType === 'Покупка') {
                updateCoin(req, coins[0], -1 * +record.dataset.amount);
                updateCoin(req, coins[1], +record.dataset.total);
            }   
            if (record.dataset.transactionType === 'Продажа') {
                updateCoin(req, coins[0], +record.dataset.amount);
                updateCoin(req, coins[1], -1 * +record.dataset.total);
            }
        }
    }
    record.remove();
}