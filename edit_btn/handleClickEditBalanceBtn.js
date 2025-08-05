import { makeHandlerOpenModal } from "./make_handler_open_modal.js";
import { makeFuncFillModal } from "./make_func_fill_modal.js";

let coins = document.querySelector('.coins');
let modal = document.querySelector('.new-coin-modal');
coins.addEventListener(
    'click', 
    makeHandlerOpenModal(modal, { action: 'edit' })
);

coins.addEventListener(
    'click', 
    makeFuncFillModal({
        modalClassName: 'new-coin-modal',
        rowTableClassName: 'coins__record',
        cellsClassNames: [
            'coins__coin',
            'coins__amount',
        ]
    })
);