import { connectDB, startTransaction } from "./db.js";

export class CustomTR extends HTMLTableRowElement {
    totalPrice = 0;
    constructor(obj = {}) {
        super();
        let { coin, amount, id } = obj;
        this.setAttribute('is', 'custom-tr');
        this.className = 'coins__record';
        this.dataset.id = id || '';
        this.dataset.name = coin || '';
        this.dataset.amount = amount || '';
        this.dataset.timeUpdate = Date.now();
    }
    
    connectedCallback() {
        this.getPrice()
            .then(this.renderPriceAndTotalPrice);
        this.innerHTML = `
            <td class="coins__btn">
                <button class="small-btn delete-btn" title="Удалить">
                    <img src="${ new URL('delete_btn/delete.png', import.meta.url) }" alt="Корзина">
                </button>
            </td>
            <td class="coins__name">${ this.dataset.name }</td>
            <td class="coins__amount">${ this.dataset.amount }</td>
            <td class="coins__price"></td>
            <td class="coins__total-price"></td>
            <td class="coins__btn">
                <button class="small-btn edit-btn" title="Редактировать">
                    <img src="${ new URL("edit_btn/edit.png", import.meta.url) }" alt="Ручка перьевая">
                </button>
            </td>
        `;
    }

    disconnectedCallback() {
        connectDB((e)=> {
            let wallet = startTransaction(e, 'wallet', 'readwrite');
            wallet.delete(+this.dataset.id);
        })
    }

    static get observedAttributes() {
        return ['data-time-update'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === null) return;
        let coin = this.querySelector('.coins__name');
        let amount = this.querySelector('.coins__amount');
        coin.textContent = this.dataset.name;
        amount.textContent = this.dataset.amount;
        this.updateRecord();
        this.getPrice()
            .then(this.renderPriceAndTotalPrice);
        this.style.animation = "backlight 3s";
        setTimeout(() => this.style.animation = '', 3000);
    }

    updateRecord() {
        let updateCallback = (e) => {
            let obj = {
                id: +this.dataset.id,
                coin: this.dataset.name.toLowerCase(),
                amount: +this.dataset.amount
            };

            let wallet = startTransaction(e, 'wallet', 'readwrite');
            wallet.put(obj);
        };

        connectDB(updateCallback);   
    }

    getPrice() {
        const URL_BARS_INFO = 'https://api.binance.com/api/v1/klines'
        return fetch(`${URL_BARS_INFO}?symbol=${this.dataset.name?.toUpperCase() || coin.toUpperCase()}USDT&interval=1d&limit=1`)
            .then((response) => response.json())
            .then((data) => {
                return parseFloat(data[0][4]).toFixed(2);
            });
    }

    renderPriceAndTotalPrice = (price) => {
        this.querySelector('.coins__price').textContent = price;
        this.querySelector('.coins__total-price').textContent = (price * +this.dataset.amount).toFixed(2);
    }
}

customElements.define('custom-tr', CustomTR, { extends: 'tr' });