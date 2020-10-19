import { CHAT_CLASS } from './consts';


export const chatTemplate = `<section class="${CHAT_CLASS}" data-chat-title="{{title}}">
    <aside>
        {{avatar}}
    </aside>

    <main class="chats-list-item__main">
        <h5 class="chats-list-item__title">{{title}}</h5>
    </main>
</section>`;
