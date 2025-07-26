import { makeHandlerOpenModal } from "./make_handler_open_modal.js";
import { makeFuncFillModal } from "./make_func_fill_modal.js";

let transactions = document.querySelector('.coins');
let modal = document.querySelector('.new-coin-modal');

transactions.addEventListener(
    'click', 
    makeHandlerOpenModal(modal, { action: 'edit' })
);

transactions.addEventListener(
    'click', 
    makeFuncFillModal({
        modalClassName: 'new-coin-modal',
        rowTableClassName: 'coins__record',
        cellsClassNames: [
            'coins__name',
            'coins__amount',
        ]
    })
);