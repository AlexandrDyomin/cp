import './add_transaction_btn/add_transaction_btn.js';
import './transaction_modal/transaction_modal.js';
import './navigation/navigation.js';
import './edit_btn/handleClickEditTransactionBtn.js';
import './transaction-row.js';
import './delete_btn/delete_btn.js';
import { connectDB, makeReadAllRecords } from './db.js';
import { renderRows } from './renderRows.js';
import { CustomBody } from './transaction-row.js';

let table = document.querySelector('.transactions');
connectDB(makeReadAllRecords('transactions', (data) => {
    renderRows(table, data, (item) => new CustomBody(item));
}));