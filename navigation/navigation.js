customElements.define('custom-nav', class extends HTMLElement {

    connectedCallback() {
        let activeLink = this.dataset.activelink;
        setTimeout(() => {
            let li = this.firstElementChild.querySelector(`li:nth-child(${activeLink})`);
            li.className = 'navigation__list-item_active';
        }, 0);
        this.innerHTML = `<nav class="navigation">
            <ul class="navigation__list">
                <li>
                    <a class="navigation__link" href="/" title="Кошелек">
                        <img class="navigation__img" src="${ new URL('wallet.png', import.meta.url) }" alt="Кошелёк">
                    </a>
                </li>
                <li>
                    <a class="navigation__link" href="/transactions" title="Транзакции">
                        <img class="navigation__img" src="${ new URL('ledger.png', import.meta.url) }" alt="Бухгалтерская книга">
                    </a>
                </li>
                <li>
                    <a class="navigation__link" href="/realizedPnL" title="Реализованный PnL">
                        <img class="navigation__img" src="${ new URL('profit.png', import.meta.url) }" alt="Рука с мешечком для денег">
                    </a>
                </li>
                <li>
                    <a class="navigation__link" href="/unrealizedPnL" title="Нереализованный PnL">
                        <img class="navigation__img" src="${ new URL('analytics.png', import.meta.url) }" alt="Гистограмма">
                    </a>
                </li>
            </ul>
        </nav>`
    }
})