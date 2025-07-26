import { connectDB } from "../db.js";
import { startTransaction } from "../db.js";
import './../modal/modal.js';
import { modal, modalFields, saveBtn } from './../modal/modal.js';

saveBtn.addEventListener('click', () => {
    let action = modal.dataset.action;
    connectDB(saveData(action, 'wallet', 'readwrite'));
});

function prepareData() {
    return [ ...modalFields]
        .reduce((acc, el) => {
            let value = (el.type === 'number') ? +el.value : el.value.toLowerCase().trim();
            value && (acc[el.name] = value);
            return acc;
        }, {});
}

function saveData(action) {
    return (e) => {
        let obj = prepareData();
        let wallet = startTransaction(e, 'wallet', 'readwrite');
        let actions = {
            add: () => {
                let addRequest = wallet.add(obj);
                
                addRequest.onsuccess = () => {
                    modal.close();
                    let countRequest =  wallet.count();
                    countRequest.onsuccess = (e) => {
                        obj.id = e.target.result;
                        renderRows([obj])
                    }
                }

                addRequest.onerror = () => {
                    let wallet = startTransaction(e, 'wallet', 'readwrite');
                    let coinIndex = wallet.index('coinIdx');
                    let coin = coinIndex.get(obj.coin);
                    coin.onsuccess = (e) => {
                        let record = e.target.result;
                        if (record) {
                            obj.id = record.id;
                            obj.amount = record.amount + obj.amount;
                            console.log(obj)
                            wallet.put(obj);
                            modal.close();
                            updateRow(obj);
                        }
                    }
                }
            },
            edit: () => {
                let getRequest = wallet.get(+obj.id);
                getRequest.onsuccess = () => {
                    wallet.put(obj);
                    modal.close();
                    updateRow(obj);
                }
            }
        }
        actions[action]();
    }
}

function updateRow(obj) {
    let row = document.querySelector(`.coins__record[data-id="${obj.id}"]`);
    row.querySelector('.coins__name').textContent = obj.coin;
    row.querySelector('.coins__amount').textContent = obj.amount;
}


function renderRows(data) {
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