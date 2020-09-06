import {renderTemplate} from '../utils/renderTemplate.js';
import {userSettingsTemplate} from './template.js';
import {buttonTemplate} from '../components/Button/template.js';
import {formfieldTemplate} from '../components/Formfield/template.js';
import {data} from './data.js';
import {validateInput, validateForm} from '../utils/formValidation.js';


const CONTAINER_CLASS_SELECTOR = 'user-settings';
const CHANGE_DATA_CLASS_SELECTOR = 'user-settings__change-data';
const CANCEL_DATA_CHANGE_CLASS_SELECTOR = 'user-settings__cancel-data-change';

let formData = data.formfields.reduce((acc, {field, value}) => {
    acc[field] = value;
    return acc;
}, {});

// compile and register templates for Button and Formfield as Handlebars partials
const Button = Handlebars.compile(buttonTemplate);
const Formfield = Handlebars.compile(formfieldTemplate);
Handlebars.registerPartial({Button, Formfield});

// toggle auth context: from register to sign in and back
const renderByContext = (context) => {
    const layout = renderTemplate(userSettingsTemplate, context);
    const container = document.getElementsByClassName(CONTAINER_CLASS_SELECTOR)[0];

    container.innerHTML = '';
    container.appendChild(layout);
    document.title = context.title;

    // handle data change click
    const changeDataAnchor = document.getElementsByClassName(CHANGE_DATA_CLASS_SELECTOR)[0];
    const cancelDataChangeAnchor = document.getElementsByClassName(CANCEL_DATA_CHANGE_CLASS_SELECTOR)[0];
    const toggleModeAnchor = changeDataAnchor || cancelDataChangeAnchor

    const handleChangeDataAnchorClick = () => {
        const newContext = {...context, readMode: !context.readMode};
        renderByContext(newContext);
    }

    toggleModeAnchor.addEventListener('click', handleChangeDataAnchorClick);

    // FIXME: Очень большое дублирование кода с авторизацией, переписать.
    // input validation on focus/blur
    const formInputs = document.getElementsByClassName('formfield__input');

    if (formInputs.length) {
        const handleFormInputInteraction = (event) => {
            const validationMessage = validateInput(event.target.value, event.target.type, event.target.dataset.fieldName);
            const errorNode = event.target.parentNode.querySelector('.formfield__error');

            if (validationMessage) {
                errorNode.textContent = validationMessage;
                event.target.classList.add('formfield__input_invalid_true');
            } else {
                errorNode.textContent = '';
                event.target.classList.remove('formfield__input_invalid_true');
            }

            console.log(formData);
        };
        const handleFormInputChange = (event) => {
            const {value, dataset: {fieldName}} = event.target;
            formData[fieldName] = value;
        };
        for (let formInput of formInputs) {
            formInput.addEventListener('focus', handleFormInputInteraction);
            formInput.addEventListener('input', handleFormInputChange);
            formInput.addEventListener('blur', handleFormInputInteraction);
        }
    }

    // form validation on submit
    const submitButton = document.querySelector('.button[type="submit"]');

    if (submitButton) {
        const handleFormSubmit = (event) => {
            event.preventDefault;

            const formInputNodes = Array.from(event.target.parentNode.getElementsByClassName('formfield__input'));
            const formInputs = formInputNodes.map(({value, type, dataset}) => ({value, type, fieldName: dataset.fieldName}));
            const validationResult = validateForm(formInputs);

            if (validationResult.length) {
                formInputNodes.forEach((inputNode) => {
                    const fieldName = inputNode.dataset.fieldName;
                    const errorNode = inputNode.parentNode.querySelector('.formfield__error');
                    const validationMessage = validationResult.find((message) => message.fieldName === fieldName);

                    if (validationMessage) {
                        errorNode.textContent = validationMessage.text;
                        inputNode.classList.add('formfield__input_invalid_true');
                    } else {
                        errorNode.textContent = '';
                        inputNode.classList.remove('formfield__input_invalid_true');
                    }
                })
            }

            console.log(formData);
        }
        submitButton.addEventListener('click', handleFormSubmit);
    }
};

renderByContext(data);