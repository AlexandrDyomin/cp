customElements.define('custom-nav', class extends HTMLElement {
    connectedCallback() {
        let activeLink = this.dataset.activeLink;
        setTimeout(() => {
            let li = this.querySelector(`li:nth-child(${activeLink})`);
            li.className = 'navigation__list-item_active';
        }, 0);
        let dir = (process.env.NODE_ENV === 'production') ? '/cp' : '';
        this.innerHTML = `
            <nav class="navigation">
                <ul class="navigation__list">
                    <li>
                        <a class="navigation__link" href="/" title="Кошелек">
                            <img class="navigation__img" src="${ dir + new URL('wallet.png', import.meta.url) }" alt="Кошелёк">
                        </a>
                    </li>
                    <li>
                        <a class="navigation__link" href="/transactions" title="Транзакции">
                            <img class="navigation__img" src="${ dir + new URL('ledger.png', import.meta.url) }" alt="Бухгалтерская книга">
                        </a>
                    </li>
                    <li>
                        <a class="navigation__link" href="/realizedPnL" title="Реализованный PnL">
                            <img class="navigation__img" src="${ dir + new URL('profit.png', import.meta.url) }" alt="Рука с мешечком для денег">
                        </a>
                    </li>
                    <li>
                        <a class="navigation__link" href="/unrealizedPnL" title="Нереализованный PnL">
                            <img class="navigation__img" src="${ dir + new URL('analytics.png', import.meta.url) }" alt="Гистограмма">
                        </a>
                    </li>
                </ul>
            </nav>
        `
    }
})