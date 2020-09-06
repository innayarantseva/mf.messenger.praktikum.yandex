import {renderTemplate} from './utils/renderTemplate.js';

const mainSectionContext = {
    heading: 'Мессенджер',
    headingInfo: 'шаблоны страниц',
    links: [
        { href: 'Error/error.html', text: 'Ошибка (на примере 500)' },
        { href: 'Authorization/authorization.html', text: 'Авторизация' },
        { href: 'ChatList/chatlist.html', text: 'Список чатов' },
        { href: 'ChatList/chatlist-messages.html', text: 'Лента переписки' },
        { href: 'UserSettings/usersettings.html', text: 'Настройки пользователя' },
    ]
};

const source = document.getElementById("root").innerHTML;
const mainSection = renderTemplate(source, mainSectionContext);

document.body.appendChild(mainSection);