export let modal = document.querySelector('.modal');
export let modalFields = [ ...modal.querySelectorAll('*[name]')];
export let saveBtn = modal.querySelector('.modal-btn_ok');

modal.addEventListener('input', () => {
    if (modalFields
        .filter((el) => el.name !== 'id' && el.name !== 'total')
        .every((el) => {
            if (el.type === 'number' && +el.value <= 0) {
                return false;
            }
            if (el.name === 'pair') {
                let coins = el.value.split('/');
                return coins.length === 2 && coins[0].length && coins[1].length;
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


