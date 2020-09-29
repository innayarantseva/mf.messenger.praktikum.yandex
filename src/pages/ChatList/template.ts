export const chatsTemplate = `<section class="chats__layout">
    <header class="chats__header">
        <div class="chats__user-settings">
            <div class="chats__user-avatar"></div>
            {{settingsLink}}
        </div>
    </header>

    <section class="chats__columns">
        <aside class="chats__aside">
            <div class="chats__search-row">
                <div class="chats__search">
                    <div class="chats__search-icon">
                        <i class="material-icons">search</i>
                    </div>
                    <input class="chats__search-input" type="text" placeholder="Поиск">
                </div>
            </div>

            <ul class="chats__list">
                {{chatList}}
            </ul>
        </aside>

        <main class="chats__main">
            {{conversation}}
            {{empty}}
        </main>
    </section>
</section>`;
