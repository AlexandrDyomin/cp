import { makeFuncOpenModalWindow } from "../make_func_open_modal_window.js";

export function makeHandlerOpenModal(modal, action) {
    return (e) => {
        if (!e.target.closest('.edit-btn')) return;
        makeFuncOpenModalWindow(modal, action)();
    }
}