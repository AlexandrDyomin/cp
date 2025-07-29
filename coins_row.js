import { connectDB, startTransaction } from "./db.js";

export class CustomTR extends HTMLTableRowElement {
    constructor(obj = {}) {
        super();
        this.setAttribute('is', 'custom-tr');
        let { coin, amount, id } = obj;
        this.className = 'coins__record';
        let { dataset } = this;
        dataset.id = id || dataset.id || '';
        dataset.name = coin || dataset.name || '';
        dataset.amount = amount || dataset.amount || '';
        dataset.timeUpdate = Date.now();
    }
    
    connectedCallback() {
        this.getPrice()
            .then(this.renderPriceAndTotalPrice)
            .then(this.dispatchTotalPrice);
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
        });

        let price = +this.querySelector('.coins__price').textContent;
        document.dispatchEvent(new CustomEvent('coin-deleted', {
            detail: { totalPrice: (+this.dataset.amount * price).toFixed(2)}
        }));
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
        this.saveData();
        this.getPrice()
            .then(this.renderPriceAndTotalPrice)
            .then(() => document.dispatchEvent(new CustomEvent('total-price-changed')));
        this.style.animation = "backlight 3s";
        setTimeout(() => this.style.animation = '', 3000);
    }

    saveData() {
        let saveCallback = (e) => {
            let obj = {
                id: +this.dataset.id,
                coin: this.dataset.name.toLowerCase(),
                amount: +this.dataset.amount
            };

            let wallet = startTransaction(e, 'wallet', 'readwrite');
            wallet.put(obj);
        };

        connectDB(saveCallback);   
    }

    getPrice() {
        const URL_BARS_INFO = 'https://api.binance.com/api/v1/klines'
        return fetch(`${URL_BARS_INFO}?symbol=${this.dataset.name?.toUpperCase() || coin.toUpperCase()}USDT&interval=1d&limit=1`)
            .then((response) => response.json())
            .then((data) => {
                return +parseFloat(data[0][4]).toFixed(2);
            });
    }

    renderPriceAndTotalPrice = (price) => {
        this.querySelector('.coins__price').textContent = price;
        let totalPrice = +(price * +this.dataset.amount).toFixed(2);
        this.querySelector('.coins__total-price').textContent = totalPrice;
        return totalPrice;
    }

    dispatchTotalPrice = (totalPrice) => document.dispatchEvent(
        new CustomEvent('total-price-resived', 
        { detail: { totalPrice } }
    ));
}

customElements.define('custom-tr', CustomTR, { extends: 'tr' });