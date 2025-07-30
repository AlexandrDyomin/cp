import { connectDB, startTransaction } from "./db.js";

export class CustomTR extends HTMLTableRowElement {
    priceRequest;
    constructor(params = {}, requiredSaveToDb = false) {
        super();
        this.requiredSaveToDb = requiredSaveToDb;
        this.setAttribute('is', 'custom-tr');
        this.className = 'coins__record';
        let { coin, amount, id } = params;
        let { dataset } = this;
        dataset.id = id || dataset.id || '';
        dataset.name = coin || dataset.name || '';
        dataset.amount = amount || dataset.amount || '';
        dataset.timeUpdate = Date.now();
        this.priceRequest = this.getPrice(dataset.name);
        this.priceRequest.then((price) => {
            dataset.price = price;
            dataset.totalPrice = (dataset.amount * price).toFixed(2);
            return price;
        });
    }
    
    async connectedCallback() {
        this.requiredSaveToDb && this.saveData();
        this.priceRequest
            .then(this.renderPriceAndTotalPrice)
            .then(this.dispatchTotalPrice);
        let { name, amount } = this.dataset;
        this.innerHTML = `
            <td class="coins__btn">
                <button class="small-btn delete-btn" title="Удалить">
                    <img src="${ new URL('delete_btn/delete.png', import.meta.url) }" alt="Корзина">
                </button>
            </td>
            <td class="coins__name">${ name }</td>
            <td class="coins__amount">${ amount }</td>
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
        let { id, amount, price } = this.dataset;
        
        connectDB((e)=> {
            let wallet = startTransaction(e, 'wallet', 'readwrite');
            wallet.delete(+id);
        });
        document.dispatchEvent(new CustomEvent('coin-deleted', {
            detail: { totalPrice: (+amount * +price).toFixed(2)}
        }));
    }

    static get observedAttributes() {
        return ['data-time-update', 'data-total-price'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === null) return;
        if(name === 'data-total-price') return;
        let { name: coin, amount } = this.dataset;
        let coinTd = this.querySelector('.coins__name');
        let amountTd = this.querySelector('.coins__amount');
        coinTd.textContent = coin;
        amountTd.textContent = amount;
        this.saveData();
        this.getPrice(coin)
            .then(this.renderPriceAndTotalPrice)
            .then(() => document.dispatchEvent(new CustomEvent('total-price-changed')));
        this.style.animation = "backlight 3s";
        setTimeout(() => this.style.animation = '', 3000);
    }

    saveData() {
        let { id, name, amount } = this.dataset;
        let obj = {
            coin: name.toLowerCase(),
            amount: +amount
        };
        id && (obj.id = +id);
        let saveCallback = (e) => {
            let wallet = startTransaction(e, 'wallet', 'readwrite');
            let putRequest = wallet.put(obj);
            putRequest.onsuccess = (e) => {
                let id = e.target.result;
                this.dataset.id = id;
            };
            putRequest.onerror = () => {
                this.remove();
                let wallet = startTransaction(e, 'wallet', 'readwrite');
                let coinIndex = wallet.index('coinIdx');
                let coin = coinIndex.get(obj.coin);
                coin.onsuccess = (e) => {
                    let record = e.target.result;
                    if (record) {
                        obj.id = +record.id;
                        obj.amount = record.amount + obj.amount;
                        let row = document.querySelector(`.coins__record[data-id="${obj.id}"]`);
                        row.dataset.amount = obj.amount;
                        row.dataset.timeUpdate = Date.now();
                    }
                }
            } 
        };

        connectDB(saveCallback);   
    }

    getPrice(coin) {
        const URL_BARS_INFO = 'https://api.binance.com/api/v1/klines'
        return fetch(`${URL_BARS_INFO}?symbol=${coin?.toUpperCase() }USDT&interval=1d&limit=1`)
            .then((response) => response.json())
            .then((data) => {
                return +parseFloat(data[0][4]).toFixed(2);
            });
    }

    renderPriceAndTotalPrice = (price) => {
        this.querySelector('.coins__price').textContent = price;
        let totalPrice = +(price * +this.dataset.amount).toFixed(2);
        this.querySelector('.coins__total-price').textContent = totalPrice;
        this.dataset.totalPrice = totalPrice;
        return totalPrice;
    }

    dispatchTotalPrice = (totalPrice) => document.dispatchEvent(
        new CustomEvent('total-price-resived', 
        { detail: { totalPrice } }
    ));
}

customElements.define('custom-tr', CustomTR, { extends: 'tr' });