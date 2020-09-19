import {renderTemplate} from '../utils/renderTemplate.js';
import {layoutTemplate} from './template.js';
import {registerFormPartial} from '../components/Form/registerForm.js';
import {handleFormInteractions} from '../components/Form/handleFormInteractions.js'
import {registerContext, signInContext} from './data.js';

let formData = {};

const CONTAINER_SELECTOR = 'authorization';
const SECONDARY_ACTION_SELECTOR = 'authorization__secondary-action';

// register Form partial for using in auth template
registerFormPartial();

// toggle auth context: from register to sign in and back
const renderByContext = (context) => {
    const layout = renderTemplate(layoutTemplate, context);
    const container = document.getElementsByClassName(CONTAINER_SELECTOR)[0];

    container.innerHTML = '';
    container.appendChild(layout);
    document.title = context.heading;

    // handle secondary action
    const secondaryActionAnchor = document.getElementsByClassName(SECONDARY_ACTION_SELECTOR)[0];
    const handleSecondaryActionAnchorClick = (event: Event) => {
        event.preventDefault;
        const newContext = (context === signInContext) ? registerContext : signInContext;
        formData = {};
        renderByContext(newContext);
    };
    secondaryActionAnchor.addEventListener('click', handleSecondaryActionAnchorClick);

    // handle form data changes
    const onFormChande = (fieldName, fieldValue) => {
        formData[fieldName] = fieldValue;
    };
    const onFormValid = () => {
        console.log(formData);
    }
    handleFormInteractions(onFormChande, onFormValid);
};

renderByContext(signInContext);