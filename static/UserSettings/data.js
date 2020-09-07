const userData = {
    firstName: 'Констанция',
    lastName: 'Константинопльская',
    displayName: 'Костя 👩‍💻',
    email: 'konstantinoplskaia@mail.dev',
    login: 'Konstantinoplskaia'
};

export const data = {
    title: 'Мои настройки',
    readMode: true,

    userData,

    form: {
        formfields: [
            {
                field: 'firstName',
                label: 'Имя',
                type: 'text',
                value: userData.firstName,
                placeholder: 'Василий',
                isRequired: true
            },
            {
                field: 'secondName',
                label: 'Фамилия',
                type: 'text',
                value: userData.lastName,
                placeholder: 'Васильков',
                isRequired: true
            },
            {
                field: 'displayName',
                label: 'Имя для отображения',
                type: 'text',
                value: userData.displayName,
                placeholder: 'Вася',
                isRequired: true
            },
            {
                field: 'login',
                label: 'Логин',
                type: 'text',
                value: userData.login,
                placeholder: 'VasVas1994',
                isRequired: true
            },
            {
                field: 'email',
                label: 'Почта',
                type: 'email',
                value: userData.email,
                placeholder: 'vasily@vasilkov.com',
                isRequired: true
            },
        ],
        submitButton: {
            type: 'submit',
            text: 'Сохранить'
        }
    }
};