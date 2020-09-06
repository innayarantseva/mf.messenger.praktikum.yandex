// validate input
const validateEmailInput = (value) => {
    if (!value) {
        return 'Это поле должно быть заполнено';
    } else if (!/[^@]+@+[^.]+\.+/.test(value)) {
        return 'Введите валидный адрес почты, например, vasily@vasilkov.com';
    }
};
const validateTelInput = (value) => {
    if (!value) {
        return 'Это поле должно быть заполнено';
    } else if (!/^(\+)?([\s0-9()-]){10,}$/g.test(value)) {
        return 'Введите валидный номер телефона, например, +7 999 999 99 99 или 8(111)111-11-11';
    }
};
const validatePasswordInput = (value) => {
    if (!value) {
        return 'Это поле должно быть заполнено';
    } else if (value.length < 6 || !/(?=.*[!@#$%^&*+-_])(?=.*[0-9])/.test(value)) {
        return 'Пароль должен быть длинее 6 символов и содержать минимум одну букву и одну цифру/спецсимвол';
    }
};
const validateTextInput = (value, textType) => {
    if (!value) {
        return 'Это поле должно быть заполнено';
    } else if (textType === 'login') {
        if (/[^a-z0-9-_]/gi.test(value)) {
            return 'Логин может состоять только из букв латинского алфавита, цифр и символов _, -';
        }
    } else if (textType === 'message') {
        if (!value.trim()) {
            return 'В сообщении должно быть что-нибудь, кроме пробелов';
        }
    } else if (textType === 'firstName' || textType === 'lastName') {
        if (/[^\p{sc=Cyrillic}a-z-]/giu.test(value)) {
            return 'Имя может состоять только из букв и символа -';
        }
    }
};

export const validateInput = (value, type, textType) => {
    switch (type) {
        case 'email': return validateEmailInput(value);
        case 'tel': return validateTelInput(value);
        case 'password': return validatePasswordInput(value);
        default: return validateTextInput(value, textType);
    }
};

export const validateForm = (formfields) => {
    return formfields.reduce((acc, {value, type, fieldName}) => {
        const validationMessage = validateInput(value, type, fieldName);

        if (validationMessage) {
            acc.push({fieldName, text: validationMessage});
        }

        return acc;
    }, []);
};