import { makeFuncOpenModalWindow } from "../make_func_open_modal_window.js";

let modal = document.querySelector('.transaction');
let addTransactionBtn = document.querySelector('.add-transaction');
addTransactionBtn.addEventListener(
    'click', 
    makeFuncOpenModalWindow(modal, { action: 'add' })
);
