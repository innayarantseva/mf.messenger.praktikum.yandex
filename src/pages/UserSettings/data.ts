import { updateUserProfile, updateUserPassword } from '../../api/user';
import { ButtonProps } from '../../components/Button';
import { getRequestFromValidationResult } from '../../utils/formValidation';
import { router } from '../../lib/Router';
import { pageNotification } from '../../lib/showNotification';

const handleFormClick = (event, validationResult) => {
    const { isValid, request } = getRequestFromValidationResult(validationResult);

    if (isValid) {
        updateUserProfile(request)
            .then((response) => {
                if (response.ok) {
                    pageNotification.showNotification({
                        text: 'Обновили данные успешно. Обновите страницу, чтобы убедиться :)',
                        type: 'info'
                    })
                    // разобраться, почему не обновляется компонент
                    router.go('/profile', { data: response.response });
                }
            });
    }
}

const handleChangePassword = (event, validationResult) => {
    const { isValid, request } = getRequestFromValidationResult(validationResult);

    if (isValid) {
        updateUserPassword(request)
            .then((response) => {
                if (response.ok) {
                    pageNotification.showNotification({
                        text: 'Обновили пароль успешно',
                        type: 'info'
                    })
                    // TODO: показать зелёную нотификашку
                    router.go('/profile');
                }
            });
    }
}

export const fields = [
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
        label: 'Имя для отображения',
        inputProps: {
            type: 'text',
            required: true,
            'data-field-name': 'display_name',
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
];

export const passwordFields = [
    {
        label: 'Старый пароль',
        inputProps: {
            type: 'password',
            required: true,
            'data-field-name': 'oldPassword',
        },
    },
    {
        label: 'Новый пароль',
        inputProps: {
            type: 'password',
            required: true,
            'data-field-name': 'newPassword',
        },
    },
];

export const passwordButtonProps: ButtonProps = {
    type: 'submit',
    text: 'Сохранить',
    onClick: handleChangePassword
};

export const buttonProps: ButtonProps = {
    type: 'submit',
    text: 'Сохранить',
    onClick: handleFormClick
};
