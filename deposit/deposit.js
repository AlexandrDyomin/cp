import { makeFuncOpenModalWindow } from "../make_func_open_modal_window.js";

let depositBtn = document.querySelector('.deposit');
let modal = document.querySelector('.new-coin-modal');
depositBtn.addEventListener('click', makeFuncOpenModalWindow(modal, { action: 'add' }));
