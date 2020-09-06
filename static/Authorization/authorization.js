import {renderTemplate} from '../utils/renderTemplate.js';
import {layoutTemplate} from './template.js';
import {buttonTemplate} from '../components/Button/template.js';
import {formfieldTemplate} from '../components/Formfield/template.js';
import {validateInput, validateForm} from '../utils/formValidation.js';
import {registerContext, signInContext} from './data.js';

let formData = {};

const CONTAINER_NAME = 'authorization';

// compile and register templates for Button and Formfield as Handlebars partials
const Button = Handlebars.compile(buttonTemplate);
const Formfield = Handlebars.compile(formfieldTemplate);

Handlebars.registerPartial({Button, Formfield});

// toggle auth context: from register to sign in and back
const renderByContext = (context) => {
    const layout = renderTemplate(layoutTemplate, context);
    const container = document.getElementsByClassName(CONTAINER_NAME)[0];

    container.innerHTML = '';
    container.appendChild(layout);
    document.title = context.heading;

    // handle secondary action
    const secondaryActionAnchor = document.getElementsByClassName('authorization__secondary-action')[0];
    const handleSecondaryActionAnchorClick = (event) => {
        event.preventDefault;
        const newContext = (context === signInContext) ? registerContext : signInContext;
        formData = {};
        renderByContext(newContext);
    };
    secondaryActionAnchor.addEventListener('click', handleSecondaryActionAnchorClick);

    // input validation on focus/blur
    const formInputs = document.getElementsByClassName('formfield__input');
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

    // form validation on submit
    const submitButton = document.querySelector('.button[type="submit"]');
    const handleFormSubmit = (event) => {
        event.preventDefault;

        const formInputNodes = Array.from(event.target.parentNode.getElementsByClassName('formfield__input'));
        const formInputs = formInputNodes.map(({value, type, dataset}) => ({value, type, fieldName: dataset.fieldName}));
        const validationResult = validateForm(formInputs);

        const errorNode = document.querySelector('.authorization__error');

        if (validationResult.length) {
            errorNode.textContent = 'Исправьте ошибки в форме';

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
        } else {
            errorNode.textContent = '';
        }

        console.log(formData);
    }
    submitButton.addEventListener('click', handleFormSubmit);
};

renderByContext(signInContext);