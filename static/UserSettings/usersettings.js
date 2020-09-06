import {renderTemplate} from '../utils/renderTemplate.js';
import {userSettingsTemplate} from './template.js';
import {buttonTemplate} from '../components/Button/template.js';
import {formfieldTemplate} from '../components/Formfield/template.js';
import {data} from './data.js';

const CONTAINER_CLASS_SELECTOR = 'user-settings';
const CHANGE_DATA_CLASS_SELECTOR = 'user-settings__change-data';
const CANCEL_DATA_CHANGE_CLASS_SELECTOR = 'user-settings__cancel-data-change';

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
};

renderByContext(data);