// import { searchIcon } from '../../assets/icons/search.js';

// export const chatsTemplate = `<section class="chats__layout">
//     <header class="chats__header">
//         <a class="chats__user-settings" href="../UserSettings/usersettings.html">
//             <div class="chats__user-avatar"></div>
//             <h5 class="chats__user-name">{{user.displayName}}</h5>
//         </a>
//     </header>

//     <section class="chats__columns">
//         <aside class="chats__aside">
//             <div class="chats__search-row">
//                 <div class="chats__search">
//                     <div class="chats__search-icon">${searchIcon}</div>
//                     <input class="chats__search-input" type="text" placeholder="Поиск по чатам">
//                 </div>
//             </div>

//             <ul class="chats__list">
//                 {{#chats}}
//                     {{> Chat}}
//                 {{/chats}}
//             </ul>
//         </aside>

//         <main class="chats__main">
//             {{#if conversation}}
//                 {{> Conversation conversation }}
//             {{else}}
//                 <div class="chats__empty">
//                     <p class="chats__empty-message">Чтобы начать переписку, выберите чат</p>
//                 </div>
//             {{/if}}
//         </main>
//     </section>
// </section>`;

export const chatsTemplate = `<section class="chats__layout">
    <header class="chats__header">
        <a class="chats__user-settings" href="../UserSettings/usersettings.html">
            <div class="chats__user-avatar"></div>
            <h5 class="chats__user-name">{{user.displayName}}</h5>
        </a>
    </header>

    <section class="chats__columns">
        <aside class="chats__aside">
            <div class="chats__search-row">
                <div class="chats__search">
                    <div class="chats__search-icon">S</div>
                    <input class="chats__search-input" type="text" placeholder="Поиск">
                </div>
            </div>

            <ul class="chats__list">
                {{chatList}}
            </ul>
        </aside>

        <main class="chats__main">
            {{conversation}}
        </main>
    </section>
</section>`;
