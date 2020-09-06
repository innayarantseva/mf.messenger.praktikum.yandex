import {searchIcon} from '../assets/icons/search.js';

export const chatsTemplate = `<section class="chats__layout">
    <aside class="chats__aside">
        <nav class="chats__nav">
            <div class="chats__search">
                <div class="chats__search-icon">${searchIcon}</div>
                <input class="chats__search-input" type="text" placeholder="Поиск по чатам">
            </div>
            <a class="chats__user-settings" href="../UserSettings/usersettings.html">
                ⚙️
            </a>
        </nav>

        <ul class="chats__list">
            {{#chats}}
                {{> Chat}}
            {{/chats}}
        </ul>
    </aside>

    <main class="chats__main">
        {{#if conversation}}
            {{> Conversation conversation }}
        {{else}}
            <div class="chats__empty">
                <p class="chats__empty-message">Чтобы начать переписку, выберите чат</p>
            </div>
        {{/if}}
    </main>
</section>`;