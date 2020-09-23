import { FormProps } from '../../components/Form/index.js';

export const signInForm: FormProps = {
    fields: [
        {
            label: 'Имя',
            inputProps: {
                type: 'text',
                required: true,
                'data-field-name': 'firstName',
            },
        },
        {
            label: 'Пароль',
            inputProps: {
                type: 'password',
                required: true,
                'data-field-name': 'password',
            },
        },
    ],
    buttonProps: {
        text: 'Войти',
        type: 'submit',
    },
};
export const signInSecondaryAction = {
    href: './signUp.html',
    info: 'Нет аккаунта?',
    linkText: 'Зарегистрироваться',
};

export const signUpForm: FormProps = {
    fields: [
        {
            label: 'Имя',
            inputProps: {
                type: 'text',
                required: true,
                'data-field-name': 'firstName',
            },
        },
        {
            label: 'Фамилия',
            inputProps: {
                type: 'text',
                required: true,
                'data-field-name': 'secondName',
            },
        },
        {
            label: 'Почта',
            inputProps: {
                type: 'email',
                required: true,
                'data-field-name': 'email',
            },
        },
        {
            label: 'Имя для отображения',
            inputProps: {
                type: 'text',
                required: true,
                'data-field-name': 'displayName',
            },
        },
        {
            label: 'Телефон',
            inputProps: {
                type: 'tel',
                required: true,
                'data-field-name': 'phone',
            },
        },
        {
            label: 'Логин',
            inputProps: {
                type: 'text',
                required: true,
                'data-field-name': 'login',
            },
        },
        {
            label: 'Пароль',
            inputProps: {
                type: 'password',
                required: true,
                'data-field-name': 'password',
            },
        },
    ],
    buttonProps: {
        text: 'Зарегистрироваться',
        type: 'submit',
    },
};
export const signUpSecondaryAction = {
    href: './signIn.html',
    info: 'Уже зарегистрированы?',
    linkText: 'Войти',
};
