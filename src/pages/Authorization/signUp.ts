import { Block, BlockProps } from '../../lib/Block.js';
import { template } from './template.js';
import {
    signUpForm as form,
    signUpSecondaryAction as secondaryAction,
} from './data.js';
import { compileTemplate } from '../../lib/templator.js';
import { Form } from '../../components/Form/index.js';

export class SignUp extends Block<BlockProps> {
    constructor() {
        super('div', {
            attributes: {
                className: 'authorization',
            },
            heading: 'Регистрация',
            form: new Form(form),
            secondaryAction,
        });
    }

    render() {
        return compileTemplate(template, this.props);
    }
}

const signUpForm = new SignUp();

function renderToDom(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

renderToDom('.app', signUpForm);
