export let modal = document.querySelector('.modal');
export let modalFields = [ ...modal.querySelectorAll('*[name]')];
export let saveBtn = modal.querySelector('.modal-btn_ok');

modal.addEventListener('input', () => {
    if (modalFields
        .filter((el) => el.name !== 'id')
        .every((el) => {
            if (el.type === 'number' && el.value <= 0) {
                return false;
            }
            return !!el.value;
        })
    ) {
        saveBtn.removeAttribute('disabled');
    } else {
        saveBtn.setAttribute('disabled', true);
    }
});

modal.addEventListener('close', () => {
    modal.dataset.action = '';
    modalFields.forEach((field) => field.value = '');
    saveBtn.setAttribute('disabled', true);
});


