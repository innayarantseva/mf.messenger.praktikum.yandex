export const registerContext = {
    heading: 'Регистрация',
    formfields: [
        { field: 'firstName', label: 'Имя', type: 'text', placeholder: 'Василий', isRequired: true },
        { field: 'lastName', label: 'Фамилия', type: 'text', placeholder: 'Васильков', isRequired: true },
        { field: 'email', label: 'Почта', type: 'email', placeholder: 'vasily@vasilkov.com', isRequired: true },
        { field: 'phone', label: 'Телефон', type: 'tel', placeholder: '+7 (999) 999-99-99', isRequired: true },
        { field: 'login', label: 'Логин', type: 'text', placeholder: 'VasVas1994', isRequired: true },
        { field: 'password', label: 'Пароль', type: 'password', placeholder: '*****', isRequired: true },
    ],
    submitButton: {
        text: 'Зарегистрироваться',
        type: 'submit'
    },
    secondaryAction: {
        href: '#',
        text: 'Войти'
    }
};

export const signInContext = {
    heading: 'Вход',
    formfields: [
        { field: 'login', label: 'Логин', type: 'text', placeholder: 'VasVas1994', isRequired: true },
        { field: 'password', label: 'Пароль', type: 'password', placeholder: '*****', isRequired: true },
    ],
    submitButton: {
        text: 'Авторизоваться',
        type: 'submit'
    },
    secondaryAction: {
        href: '#',
        text: 'Нет аккаунта?'
    }
};