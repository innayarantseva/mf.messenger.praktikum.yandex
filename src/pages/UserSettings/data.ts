import { FormProps } from '../../components/Form/index.js';
// import { validateForm } from '../../utils/formValidation.js'

const userData = {
    firstName: 'Констанция',
    lastName: 'Константинопльская',
    name: 'Констанция Константинопльская',
    displayName: 'Костя 👩‍💻',
    email: 'konstantinoplskaia@mail.dev',
    login: 'Konstantinoplskaia',
};

export const data = {
    title: 'Мои настройки',
    readMode: true,

    userData,
};

export const form: FormProps = {
    fields: [
        {
            label: 'Имя',
            inputProps: {
                type: 'text',
                value: userData.firstName,
                required: true,
                'data-field-name': 'firstName',
            },
        },
        {
            label: 'Фамилия',
            inputProps: {
                type: 'text',
                value: userData.lastName,
                required: true,
                'data-field-name': 'secondName',
            },
        },
        {
            label: 'Имя для отображения',
            inputProps: {
                type: 'text',
                value: userData.displayName,
                required: true,
                'data-field-name': 'displayName',
            },
        },
        {
            label: 'Логин',
            inputProps: {
                type: 'text',
                value: userData.login,
                required: true,
                'data-field-name': 'login',
            },
        },
        {
            label: 'Почта',
            inputProps: {
                type: 'email',
                value: userData.email,
                required: true,
                'data-field-name': 'email',
            },
        },
    ],
    buttonProps: {
        type: 'submit',
        text: 'Сохранить',
        onClick: (event) => {
            event.preventDefault();
            console.log('click!');
            // console.log(validateForm());
        },
    },
};
