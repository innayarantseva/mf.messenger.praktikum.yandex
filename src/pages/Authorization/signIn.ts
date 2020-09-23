import { Block, BlockProps } from '../../lib/Block.js';
import { template } from './template.js';
import {
    signInForm as form,
    signInSecondaryAction as secondaryAction,
} from './data.js';
import { compileTemplate } from '../../lib/templator.js';
import { Form } from '../../components/Form/index.js';

export class SignIn extends Block<BlockProps> {
    constructor() {
        super('div', {
            attributes: {
                className: 'authorization',
            },
            heading: 'Вход',
            form: new Form(form),
            secondaryAction,
        });
    }

    render() {
        return compileTemplate(template, this.props);
    }
}

const signInForm = new SignIn();

function renderToDom(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

renderToDom('.app', signInForm);
