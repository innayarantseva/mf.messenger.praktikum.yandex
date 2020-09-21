export const chatTemplate = `<li>
    <section class="chats-list-item" data-chat-title="{{displayName}}">
        <aside>
            <div class="chats-list-item__avatar">
                {{#if isOnline}}
                    <div class="chats-list-item__avatar-indicator"></div>
                {{/if}}
            </div>
        </aside>

        <main class="chats-list-item__main">
            <header class="chats-list-item__header">
                <h5 class="chats-list-item__title">{{displayName}}</h5>
                <time class="chats-list-item__date">{{lastMessage.date}}</time>
            </header>
            <div class="chats-list-item__content">
                <p class="chats-list-item__message-preview">
                    {{#if lastMessage.fromMe}}
                        <b class="chats-list-item__me">Я:</b>
                    {{/if}}
                    {{lastMessage.preview}}
                </p>
                {{#if unreadCounter}}
                    <p class="chats-list-item__badge">{{unreadCounter}}</p>
                {{/if}}
            </div>
        </main>
    </section>
</li>`;