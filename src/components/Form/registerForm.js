import {buttonTemplate} from '../Button/template.js';
import {formfieldTemplate} from '../Formfield/template.js';
import {formTemplate} from '../Form/template.js';

export const registerFormPartial = () => {
    // compile and register templates for Button, Formfield and Form as Handlebars partials
    const Button = Handlebars.compile(buttonTemplate);
    const Formfield = Handlebars.compile(formfieldTemplate);
    const Form = Handlebars.compile(formTemplate);

    Handlebars.registerPartial({Button, Formfield, Form});
};