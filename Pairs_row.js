export class CustomPnLRow extends HTMLTableRowElement {
    constructor(params = {} ) {
        super();
        this.setAttribute('is', 'custom-PnL-row');
        let { pair, profit, percent, invested } = params;
        this.dataset.pair = pair || '';
        this.dataset.profit = profit || '';
        this.dataset.percent = percent || '';
        this.dataset.invested = invested || '';
    }

    connectedCallback() {
        let { pair, profit, percent, invested } = this.dataset;
        this.innerHTML = `
            <td class="pairs__name">${ pair }</td>
            <td class="pairs__profit" style=${parseFloat(profit) > 0 ? "color:green":"color:red"}>${ parseFloat(profit).toFixed(2) }</td>
            <td class="pairs__percent" style=${parseFloat(percent) > 0 ? "color:green":"color:red"}>${ parseFloat(percent).toFixed(2) }</td>
            <td class="pairs__invested">${ parseFloat(invested).toFixed(2) }</td>
        `;
    }
}

customElements.define('custom-pnl-row', CustomPnLRow, { extends: 'tr' });
