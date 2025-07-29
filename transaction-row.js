import { connectDB, startTransaction } from "./db.js";

export class CustomBody extends HTMLTableSectionElement {
    requiredSaveToDb;
    constructor(params = {}, requiredSaveToDb = false) {
        super();
        this.requiredSaveToDb = requiredSaveToDb;
        this.setAttribute('is', 'custom-transaction');
        this.className = 'transactions__record';
        let { id, date, pair, transactionType, amount, price } = params;
        let { dataset } = this;
        dataset.id = id || dataset.id || '';
        dataset.date = date || dataset.date || '';
        dataset.pair = pair || dataset.pair || '';
        dataset.transactionType = transactionType || dataset.transactionType || '';
        dataset.amount = amount || dataset.amount || '';
        dataset.price = price || dataset.price || '';
        this.dataset.timeUpdate = Date.now();
    }

    connectedCallback() {
        this.requiredSaveToDb && this.saveData();
        let { date, pair, transactionType, amount, price } = this.dataset;
        let modifierTransactionType = (transactionType === 'Покупка') ? 
            'transactions__type_green' : 'transactions__type_red';
        this.innerHTML = `
            <tr class="transactions__first-row">
                <td colspan="2">
                    <div class="transactions__date">
                        <button class="small-btn delete-btn" title="Удалить"><img src="${ new URL('delete_btn/delete.png', import.meta.url) } alt="Удалить"></button>
                        <time datetime=${ date }>${ this.formatDate(date) }</time>
                        <button class="small-btn edit-btn" title="Редактировать"><img src="${ new URL('edit_btn/edit.png', import.meta.url) } alt="Редактировать"></button>
                    </div>
                </td>
            </tr>
            <tr>
                <th>Пара</th>
                <td class="transactions__pair">${ pair }</td>    
            </tr>
                <tr>
                <th>Вид транзакции</th>
                <td class="transactions__type ${ modifierTransactionType }">${ transactionType }</td>  
            </tr>
            <tr>
                <th>Количество</th>
                <td class="transactions__amount">${ amount }</td>
            </tr>
            <tr>
                <th>Цена</th>
                <td class="transactions__price">${ price }</td>
            </tr>
            <tr>
                <th>Стоимость</th>
                <td class="transactions__total-price">${ (+amount * +price).toFixed(2) }</td>
            </tr>
        `;
    }

    disconnectedCalback() {

    }

    static get observedAttributes() {
        return ['data-time-update'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === null) return;
        this.saveData();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return date.toLocaleDateString('ru-RU', options);
    }

    saveData() {
        let { id, date, pair, transactionType, amount, price } = this.dataset;
        let saveCallback = (e) => {
            let obj = {
                date,
                transactionType,
                pair,
                amount: +amount,
                price: +price
            };
            id && (obj.id = id);
            let transactions = startTransaction(e, 'transactions', 'readwrite');
            let putRequest = transactions.put(obj);
            putRequest.onsuccess = (e) => {
                let id = e.target.result;
                this.dataset.id = id;
            };
        };

        connectDB(saveCallback);   
    }
}

customElements.define('custom-transaction', CustomBody, { extends: 'tbody' });