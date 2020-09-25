import { renderTemplate } from './utils/renderTemplate.js';
import { Router } from './lib/Router.js';
import { Chats } from './pages/ChatList/chatlist.js';
import { SignIn } from './pages/Authorization/signIn.js';

const mainSectionContext = {
    heading: 'Мессенджер',
    headingInfo: 'шаблоны страниц',

    description: `Добрый день!
    Между шаблонами страниц есть переходы практически во всех случаях, кроме авторизации: из неё нельзя попасть на страницу всех чатов.
    Для этого придётся вернуться на эту главную страницу или вручную написать адрес страницы в адресной строке.
    Такая же история с настройками пользователя: они находятся в стадии активных экспериментов 😬`,
    links: [
        { href: 'pages/Error/error.html', text: 'Ошибка (на примере 500)' },
        { href: 'pages/Authorization/signIn.html', text: 'Авторизация' },
        { href: 'pages/ChatList/chatlist.html', text: 'Список чатов' },
        {
            href: 'pages/UserSettings/usersettings.html',
            text: 'Настройки пользователя',
        },
    ],
};

const source = document.getElementById('root').innerHTML;
const mainSection = renderTemplate(source, mainSectionContext);

document.body.appendChild(mainSection);

// Можно обновиться на /user и получить сразу пользователя
const router = new Router('.app');

router.use('/chats', Chats).use('/sign-in', SignIn).start();

// Через секунду контент изменится сам, достаточно дернуть переход
setTimeout(() => {
    router.go('/sign-in');
}, 5000);

// А можно и назад
setTimeout(() => {
    router.back();
}, 10000);

// И снова вперед
setTimeout(() => {
    router.forward();
}, 15000);
