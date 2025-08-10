var u=globalThis,i={},t={},e=u.parcelRequire8123;null==e&&((e=function(u){if(u in i)return i[u].exports;if(u in t){var e=t[u];delete t[u];var a={id:u,exports:{}};return i[u]=a,e.call(a.exports,a,a.exports),a.exports}var n=Error("Cannot find module '"+u+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(u,i){t[u]=i},u.parcelRequire8123=e);var a=e.register;a("iL6GR",function(u,i){customElements.define("custom-nav",class extends HTMLElement{connectedCallback(){let u=this.dataset.activeLink;setTimeout(()=>{this.querySelector(`li:nth-child(${u})`).className="navigation__list-item_active"},0),this.innerHTML=`
            <nav class="navigation">
                <ul class="navigation__list">
                    <li>
                        <a class="navigation__link" href="/" title="\u{41A}\u{43E}\u{448}\u{435}\u{43B}\u{435}\u{43A}">
                            <img class="navigation__img" src="${new URL(e("8sXdA"))}" alt="\u{41A}\u{43E}\u{448}\u{435}\u{43B}\u{451}\u{43A}">
                        </a>
                    </li>
                    <li>
                        <a class="navigation__link" href="/transactions" title="\u{422}\u{440}\u{430}\u{43D}\u{437}\u{430}\u{43A}\u{446}\u{438}\u{438}">
                            <img class="navigation__img" src="${new URL(e("4LmI1"))}" alt="\u{411}\u{443}\u{445}\u{433}\u{430}\u{43B}\u{442}\u{435}\u{440}\u{441}\u{43A}\u{430}\u{44F} \u{43A}\u{43D}\u{438}\u{433}\u{430}">
                        </a>
                    </li>
                    <li>
                        <a class="navigation__link" href="/realizedPnL" title="\u{420}\u{435}\u{430}\u{43B}\u{438}\u{437}\u{43E}\u{432}\u{430}\u{43D}\u{43D}\u{44B}\u{439} PnL">
                            <img class="navigation__img" src="${new URL(e("7MWLU"))}" alt="\u{420}\u{443}\u{43A}\u{430} \u{441} \u{43C}\u{435}\u{448}\u{435}\u{447}\u{43A}\u{43E}\u{43C} \u{434}\u{43B}\u{44F} \u{434}\u{435}\u{43D}\u{435}\u{433}">
                        </a>
                    </li>
                    <li>
                        <a class="navigation__link" href="/unrealizedPnL" title="\u{41D}\u{435}\u{440}\u{435}\u{430}\u{43B}\u{438}\u{437}\u{43E}\u{432}\u{430}\u{43D}\u{43D}\u{44B}\u{439} PnL">
                            <img class="navigation__img" src="${new URL(e("i0GDG"))}" alt="\u{413}\u{438}\u{441}\u{442}\u{43E}\u{433}\u{440}\u{430}\u{43C}\u{43C}\u{430}">
                        </a>
                    </li>
                </ul>
            </nav>`}})}),a("8sXdA",function(u,i){u.exports=import.meta.resolve("gMJVE")}),a("4LmI1",function(u,i){u.exports=import.meta.resolve("2NdMt")}),a("7MWLU",function(u,i){u.exports=import.meta.resolve("gW5Z3")}),a("i0GDG",function(u,i){u.exports=import.meta.resolve("8odM1")}),e("iL6GR");