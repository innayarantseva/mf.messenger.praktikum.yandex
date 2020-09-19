export const registerContext = {
    heading: 'Регистрация',
    form: {
        formfields: [
            { field: 'firstName', label: 'Имя', type: 'text', isRequired: true },
            { field: 'lastName', label: 'Фамилия', type: 'text', isRequired: true },
            { field: 'email', label: 'Почта', type: 'email', isRequired: true },
            { field: 'phone', label: 'Телефон', type: 'tel', isRequired: true },
            { field: 'login', label: 'Логин', type: 'text', isRequired: true },
            { field: 'password', label: 'Пароль', type: 'password', isRequired: true },
        ],
        submitButton: {
            text: 'Зарегистрироваться',
            type: 'submit'
        }
    },
    secondaryAction: {
        href: '#',
        text: 'Войти'
    }
};

export const signInContext = {
    heading: 'Вход',
    form: {
        formfields: [
            { field: 'login', label: 'Логин', type: 'text', isRequired: true },
            { field: 'password', label: 'Пароль', type: 'password', isRequired: true },
        ],
        submitButton: {
            text: 'Авторизоваться',
            type: 'submit'
        }
    },
    secondaryAction: {
        href: '#',
        text: 'Нет аккаунта?'
    }
};