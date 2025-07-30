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
        dataset.timeUpdate = Date.now();
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
                        <button class="small-btn delete-btn" title="Удалить"><img src="${ new URL('delete_btn/delete.png', import.meta.url) } alt="Корзина"></button>
                        <time datetime=${ date }>${ this.formatDate(date) }</time>
                        <button class="small-btn edit-btn" title="Редактировать"><img src="${ new URL('edit_btn/edit.png', import.meta.url) } alt="Ручка перьевая"></button>
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

    disconnectedCallback() {
        let { id } = this.dataset;

        connectDB((e)=> {
            let transactions = startTransaction(e, 'transactions', 'readwrite');
            transactions.delete(+id);
        });
    }

    static get observedAttributes() {
        return ['data-time-update'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === null) return;
        this.saveData();

        let datasetNames = ['date', 'pair', 'transactionType', 'amount', 'price', 'total'];
        ['.transactions__date time', 
            '.transactions__pair', 
            '.transactions__type', 
            '.transactions__amount', 
            '.transactions__price', 
            '.transactions__total-price']
            .forEach((selector, i) => {
                let td = this.querySelector(selector);
                if (selector === '.transactions__date time') {
                    td.datetime = this.dataset.date;
                    td.textContent = this.formatDate(this.dataset.date);
                    return;
                }
                td.textContent = this.dataset[datasetNames[i]];
            });

        this.style.animation = "backlight 3s";
        this.firstElementChild.style.animation = "colorlight 3s";

        setTimeout(() => {
            this.firstElementChild.style.animation = '';
            this.style.animation = '';
        }
        , 3000);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return date.toLocaleDateString('ru-RU', options);
    }

    saveData() {
        let { id, date, pair, transactionType, amount, price } = this.dataset;
        let obj = {
            date,
            transactionType,
            pair,
            amount: +amount,
            price: +price
        };
        id && (obj.id = +id);
        let saveCallback = (e) => {
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