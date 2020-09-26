import { CHAT_CLASS } from './consts.js';

export const chatTemplate = `<li>
    <section class="${CHAT_CLASS}" data-chat-title="{{displayName}}">
        <aside>
            {{avatar}}
        </aside>

        <main class="chats-list-item__main">
            <header class="chats-list-item__header">
                <h5 class="chats-list-item__title">{{displayName}}</h5>
                <time class="chats-list-item__date">{{lastMessage.date}}</time>
            </header>
            <div class="chats-list-item__content">
                <p class="chats-list-item__message-preview">
                    {{me}}
                    {{lastMessage.preview}}
                </p>
                {{badge}}
            </div>
        </main>
    </section>
</li>`;
