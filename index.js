import './navigation/navigation.js';
import './deposit/deposit.js';
import './edit_btn/handleClickEditBalanceBtn.js';
import './new_coin_modal/new_coin_modal.js';
import './delete_btn/delete_btn.js';
import { connectDB, makeReadAllRecords, readAllStores } from './db.js';
import { renderRows } from './renderRows.js';
import { CustomTR } from './coins_row.js';
import { uploadData, clearStore } from './db.js';

let table = document.querySelector('.coins');
connectDB(makeReadAllRecords('wallet', (data) => {
    renderRows(table, data, (item) => new CustomTR(item))}
));

document.addEventListener('coin-added', increaseBalance);
document.addEventListener('coin-changed', recalcBalance);
document.addEventListener('coin-deleted', decreaseBalance);

let balanceValue = document.querySelector('.balance__value');
let downloadBtn = document.querySelector('.download');

connectDB(async (req) => {
    URL.revokeObjectURL(downloadBtn.href);
    downloadBtn.href = URL.createObjectURL(await prepareData(req));
    downloadBtn.addEventListener('click', saveDb);

    function saveDb(e) {
        connectDB(async (req) => {
            downloadBtn.href = URL.createObjectURL(await prepareData(req));
        });
    }
});

async function prepareData(req) {
    let result = await readAllStores(req);
    result = JSON.stringify(result);
    return new Blob([result], { type: 'application/json' });
}

let uploadBtn = document.querySelector('.upload');
uploadBtn.addEventListener('click', () => uploadBtn.children[0].click());
uploadBtn.addEventListener('change', handleClickUploadBtn);
function handleClickUploadBtn(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => { 
        let data = JSON.parse(reader.result); 
        connectDB((req) => {
            clearStore(req, 'wallet', 'transactions');
            uploadData(req, data);
            document.location.reload();
        });
    }
    reader.onerror = () => console.log(reader.error);
}

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
