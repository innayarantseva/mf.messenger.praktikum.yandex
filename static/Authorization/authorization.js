import {renderTemplate} from '../utils/renderTemplate.js';
import {layoutTemplate} from './template.js';
import {buttonTemplate} from '../components/Button/template.js';
import {formfieldTemplate} from '../components/Formfield/template.js';

const registerContext = {
    heading: 'Регистрация',
    formfields: [
        { label: 'Имя', type: 'text', placeholder: 'Василий', isRequired: true },
        { label: 'Фамилия', type: 'text', placeholder: 'Васильков', isRequired: true },
        { label: 'Почта', type: 'email', placeholder: 'vasily@vasilkov.com', isRequired: true },
        { label: 'Телефон', type: 'telephone', placeholder: '+7 (999) 999-99-99', isRequired: true },
        { label: 'Логин', type: 'text', placeholder: 'VasVas1994', isRequired: true },
        { label: 'Пароль', type: 'password', placeholder: '*****', isRequired: true },
    ],
    error: 'Такой пользователь уже существует',
    submitButton: {
        text: 'Зарегистрироваться',
        type: 'submit'
    },
    secondaryAction: {
        href: '#',
        text: 'Войти'
    }
};

const signInContext = {
    heading: 'Вход',
    formfields: [
        { label: 'Логин', type: 'text', placeholder: 'VasVas1994', isRequired: true },
        { label: 'Пароль', type: 'password', placeholder: '*****', isRequired: true },
    ],
    error: 'Неверный логин или пароль. Попробуйте снова',
    submitButton: {
        text: 'Авторизоваться',
        type: 'submit'
    },
    secondaryAction: {
        href: '#',
        text: 'Нет аккаунта?'
    }
};

const CONTAINER_NAME = 'authorization';

// compile and register templates for Button and Formfield as Handlebars partials
const Button = Handlebars.compile(buttonTemplate);
const Formfield = Handlebars.compile(formfieldTemplate);

Handlebars.registerPartial({Button, Formfield});

// toggle auth context: from register to sign in and back
const renderByContext = (context) => {
    const layout = renderTemplate(layoutTemplate, context);
    const container = document.getElementsByClassName(CONTAINER_NAME)[0];

    container.innerHTML = '';
    container.appendChild(layout);
    document.title = context.heading;

    // handle secondary action
    const secondaryActionAnchor = document.getElementsByClassName('authorization__secondary-action')[0];

    secondaryActionAnchor.addEventListener('click', (event) => {
        event.preventDefault;
        const newContext = (context === signInContext) ? registerContext : signInContext;
        renderByContext(newContext);
    });
}

renderByContext(signInContext);