import {renderTemplate} from './utils/renderTemplate.js';

const mainSectionContext = {
    heading: 'Мессенджер',
    headingInfo: 'шаблоны страниц',

    description: `Добрый день!
    Между шаблонами страниц есть переходы практически во всех случаях, кроме авторизации: из неё нельзя попасть на страницу всех чатов.
    Для этого придётся вернуться на эту главную страницу или вручную написать адрес страницы в адресной строке.
    Но со страницы всех чатов можно попасть на авторизацию, нажав "Выйти" в настройках пользователя :)`,
    links: [
        { href: 'Error/error.html', text: 'Ошибка (на примере 500)' },
        { href: 'Authorization/authorization.html', text: 'Авторизация' },
        { href: 'ChatList/chatlist.html', text: 'Список чатов' },
        { href: 'UserSettings/usersettings.html', text: 'Настройки пользователя' },
    ]
};

const source = document.getElementById("root").innerHTML;
const mainSection = renderTemplate(source, mainSectionContext);

document.body.appendChild(mainSection);