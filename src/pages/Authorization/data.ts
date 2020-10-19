import { signUp, signIn } from '../../api/authorization';
import { FormProps } from '../../components/Form/index';
import { router } from '../../lib/Router';
import { setValue } from '../../store/store';
import { getRequestFromValidationResult } from '../../utils/formValidation';


// FIXME: объединить в одну ф-ию
const handleSignUpFormSubmit = (event, validationResult) => {
    // проверка валидности и создание запроса
    const { isValid, request } = getRequestFromValidationResult(validationResult);

    if (isValid) {
        signUp(request)
            .then((response) => {
                if (response.ok) {
                    setValue({ currentUser: response.response });
                    router.go('/chats');
                }
            });
    }
};

const handleSignInFormSubmit = (event, validationResult) => {
    // проверка валидности и создание запроса
    const { isValid, request } = getRequestFromValidationResult(validationResult);

    if (isValid) {
        signIn(request)
            .then((response) => {
                if (response.ok) {
                    setValue({ currentUser: response.response });
                    router.go('/chats');
                }
            });
    }
};

export const signInForm: FormProps = {
    fields: [
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
        text: 'Войти',
        type: 'submit',
        onClick: handleSignInFormSubmit
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
                'data-field-name': 'first_name',
            },
        },
        {
            label: 'Фамилия',
            inputProps: {
                type: 'text',
                required: true,
                'data-field-name': 'second_name',
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
        onClick: handleSignUpFormSubmit
    },
};
export const signUpSecondaryAction = {
    href: './signIn.html',
    info: 'Уже зарегистрированы?',
    linkText: 'Войти',
};
