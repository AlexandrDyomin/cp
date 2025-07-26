import './navigation/navigation.js';
import './deposit/deposit.js';
import './edit_btn/handleClickEditBalanceBtn.js';
import './new_coin_modal/new_coin_modal.js';
import { connectDB, makeReadAllRecords } from './db.js';

connectDB(makeReadAllRecords('wallet', renderTable))


function renderTable(data) {
    let templRow = document.querySelector('#coin-row').content;  
    let rows = [];
    
    data.forEach(el => {
        let row = templRow.cloneNode(true);
        row.firstElementChild.dataset.id = el.id;
        row.querySelector('.coins__name').textContent = el.coin;
        row.querySelector('.coins__amount').textContent = el.amount;
        rows.push(row);
    });

    let table = document.querySelector('.coins');
    table.append(...rows);
}