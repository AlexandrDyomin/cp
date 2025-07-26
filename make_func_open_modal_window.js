function makeFuncOpenModalWindow(modal, { action }) {
    return () => {
        modal.dataset.action = action;
        modal.showModal();
    }

}

export { makeFuncOpenModalWindow };