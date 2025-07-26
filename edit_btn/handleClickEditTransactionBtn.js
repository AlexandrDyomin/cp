import { makeHandlerOpenModal } from "./make_handler_open_modal.js";
import { makeFuncFillModal } from "./make_func_fill_modal.js";

let transactions = document.querySelector('.transactions');
let modal = document.querySelector('.transaction');
transactions.addEventListener(
    'click', 
    makeHandlerOpenModal(modal, { action: 'edit' })
);

transactions.addEventListener(
    'click', 
    makeFuncFillModal({
        modalClassName: 'transaction',
        rowTableClassName: 'transactions__record',
        cellsClassNames: [
            'transaction__date time',
            'transactions__pair',
            'transactions__type',
            'transactions__amount',
            'transactions__price',
            'transactions__total-price'
        ]
    })
);