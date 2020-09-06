import {dotsIcon} from '../../assets/icons/dots.js';
import {attachIcon} from '../../assets/icons/attach.js';
import {sendIcon} from '../../assets/icons/send.js';

export const conversationTemplate = `<article class="conversation">
    <header class="conversation__header">
        <div class="conversation__avatar">
            {{#if status.isOnline}}
                <div class="conversation__avatar-indicator"></div>
            {{/if}}
        </div>

        <div class="conversation__info">
            <h3 class="conversation__title">{{title}}</h3>
            {{#if status}}
                <p class="conversation__status conversation__status-online-{{status.isOnline}}">{{status.description}}</p>
            {{/if}}
        </div>

        <div class="conversation__options">
            ${dotsIcon}

            <ul class="conversation__options-menu">
                <li>Переименовать чат</li>
                <li>Удалить</li>
            </ul>
        </div>
    </header>

    <main class="conversation__messages">
        {{#conversations}}
            <h5 class="conversation__messages-date">{{date}}</h5>

            {{#messages}}
                {{> Message}}
            {{/messages}}
        {{/conversations}}
    </main>

    <footer class="conversation__footer">
        <div class="conversation__attachment">
            ${attachIcon}

            <ul class="conversation__attachment-menu">
                <li>Фото или видео</li>
                <li>Файл</li>
                <li>Локация</li>
                <li>Стикер</li>
            </ul>
        </div>

        <textarea class="conversation__new-message" placeholder="Напишите сообщение..."></textarea>

        <div class="conversation__send">${sendIcon}</div>
    </footer>
</article>`;