import {validateInput, validateForm} from '../../utils/formValidation.js';

const defaultSelectors = {
    formfieldInput: 'formfield__input',
    formfieldError: 'formfield__error',
    formError: 'form__error',
    invalidFormfield: 'formfield__input_invalid_true',
    submitQuerySelector: '.button[type="submit"]'
};

export const handleFormInteractions = (onChange, onValid, selectors = defaultSelectors) => {
    const { formfieldInput, formfieldError, formError, invalidFormfield, submitQuerySelector } = selectors;

    // input validation on focus/blur
    const formInputs = document.getElementsByClassName(formfieldInput);

    if (formInputs.length) {
        const handleFormInputInteraction = (event) => {
            const validationMessage = validateInput(event.target.value, event.target.type, event.target.dataset.fieldName);
            const errorNode = event.target.parentNode.querySelector(`.${formfieldError}`);

            if (validationMessage) {
                errorNode.textContent = validationMessage;
                event.target.classList.add(invalidFormfield);
            } else {
                errorNode.textContent = '';
                event.target.classList.remove(invalidFormfield);
            }

        };
        const handleFormInputChange = (event) => {
            const {value, dataset: {fieldName}} = event.target;
            onChange(fieldName, value);
        };
        for (let formInput of formInputs) {
            formInput.addEventListener('focus', handleFormInputInteraction);
            formInput.addEventListener('input', handleFormInputChange);
            formInput.addEventListener('blur', handleFormInputInteraction);
        }
    }

    // form validation on submit
    const submitButton = document.querySelector(submitQuerySelector);

    if (submitButton) {
        const handleFormSubmit = (event) => {
            event.preventDefault;

            const formInputNodes = Array.from(event.target.parentNode.getElementsByClassName(formfieldInput));
            const formInputs = formInputNodes.map(({value, type, dataset}) => ({value, type, fieldName: dataset.fieldName}));
            const validationResult = validateForm(formInputs);

            const errorNode = document.querySelector(`.${formError}`);

            if (validationResult.length) {
                errorNode.textContent = 'Исправьте ошибки в форме';

                formInputNodes.forEach((inputNode) => {
                    const fieldName = inputNode.dataset.fieldName;
                    const errorNode = inputNode.parentNode.querySelector(`.${formfieldError}`);
                    const validationMessage = validationResult.find((message) => message.fieldName === fieldName);

                    if (validationMessage) {
                        errorNode.textContent = validationMessage.text;
                        inputNode.classList.add(invalidFormfield);
                    } else {
                        errorNode.textContent = '';
                        inputNode.classList.remove(invalidFormfield);
                    }
                })
            } else {
                errorNode.textContent = '';
                onValid();
            }

        }
        submitButton.addEventListener('click', handleFormSubmit);
    }
};
