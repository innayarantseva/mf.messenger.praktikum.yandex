// import { dotsIcon } from '../../../assets/icons/dots.js';
// import { attachIcon } from '../../../assets/icons/attach.js';
// import { sendIcon } from '../../assets/icons/send.js';

export const template = `<section class="conversation">
    <header class="conversation__header">
        <div>{{avatar}}</div>

        <div class="conversation__info">
            <h3 class="conversation__title">{{title}}</h3>
            <p class="conversation__status conversation__status-online-{{isOnline}}">{{description}}</p>
        </div>

        <div class="conversation__options">
            <p>...</p>

            <ul class="conversation__options-menu">
                <li>Переименовать чат</li>
                <li>Удалить</li>
            </ul>
        </div>
    </header>

    <main class="conversation__messages">
        {{threads}}
    </main>

    <footer class="conversation__footer">
        <div class="conversation__attachment">
            <p>X</p>

            <ul class="conversation__attachment-menu">
                <li>Фото или видео</li>
                <li>Файл</li>
                <li>Локация</li>
                <li>Стикер</li>
            </ul>
        </div>

        <textarea class="conversation__new-message" placeholder="Напишите сообщение..."></textarea>

        <div class="conversation__send">Отправить</div>
    </footer>
</section class="">`;

// {{#conversations}}
//             <h5 class="conversation__messages-date">{{date}}</h5>

//             {{#messages}}
//                 {{> Message}}
//             {{/messages}}
//         {{/conversations}}
