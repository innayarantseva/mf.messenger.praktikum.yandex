export const chatsTemplate = `<section class="chats__layout">
    <header class="chats__header">
        <div class="chats__user-settings">
            {{avatar}}
            {{settingsLink}}
        </div>
    </header>

    {{chatsContainer}}
</section>`;

export const noChats = `<section class="chats-container__emtpy">
    <h3>Пока что пусто!</h3>
    <p class="chats-container__emtpy-text">Начните общаться, создав новый чат</p>
    {{createNewChatForm}}
</section>`;

export const chatsContainer = `<section class="chats__columns">
    <aside class="chats__aside">
        <ul class="chats__list">
            {{chatList}}
        </ul>

        {{newChat}}
    </aside>

    <main class="chats__main">
        {{conversationContainer}}
    </main>
</section>`;
