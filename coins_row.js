import { connectDB, startTransaction } from "./db.js";

export class CustomTR extends HTMLTableRowElement {

    price = 100;
    totalPrice = 22;
    addRecordToDb
    constructor(obj = {}) {
        super();
        
        let { coin, amount, id } = obj;
        this.setAttribute('is', 'custom-tr');
        this.className = 'coins__record';
        this.dataset.name = this.dataset.name || coin || '';
        this.dataset.amount = this.dataset.amount || amount || '';
        this.dataset.id = this.dataset.id || id || '';
        this.templ = `
            <td class="coins__btn">
                <button class="small-btn delete-btn" title="Удалить">
                <img src="${ new URL('delete_btn/delete.png', import.meta.url) }" alt="Корзина">
            </button>
            </td>
            <td class="coins__name">${ this.dataset.name }</td>
            <td class="coins__amount">${ this.dataset.amount }</td>
            <td class="coins__price">${ this.price }</td>
            <td class="coins__total-price">${ this.totalPrice }</td>
            <td class="coins__btn">
            <button class="small-btn edit-btn" title="Редактировать">
                <img src="${ new URL("edit_btn/edit.png", import.meta.url) }" alt="Ручка перьевая">
            </button>
            </td>
        `
    }
    
    connectedCallback() {
        this.innerHTML = this.templ;
    }

    disconnectedCallback() {
        connectDB((e)=> {
            let wallet = startTransaction(e, 'wallet', 'readwrite');
            wallet.delete(+this.dataset.id);
        })
    }

    static get observedAttributes() {
        return ['data-name', 'data-amount', 'data-id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!oldValue) return;
        let td = this.querySelector(`.coins__${name.slice(5)}`);
        this.updateRecord();
        td.textContent = newValue;
    }

    updateRecord() {
        connectDB(updateCallback.bind(this));   
  
        function updateCallback(e) {
            let obj = {
                id: +this.dataset.id,
                coin: this.dataset.name.toLowerCase(),
                amount: +this.dataset.amount
            };

            let wallet = startTransaction(e, 'wallet', 'readwrite');
            wallet.put(obj);
        }
    }
}

customElements.define('custom-tr', CustomTR, { extends: 'tr' });