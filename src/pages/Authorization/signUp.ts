import { Block, BlockProps } from '../../lib/Block.js';
import { template } from './template.js';
import {
    signUpForm as form
} from './data.js';
import { compileTemplate } from '../../lib/templator.js';
import { Form } from '../../components/Form/index.js';
import { NavLink } from '../../components/NavLink/index.js';

export class SignUp extends Block<BlockProps> {
    constructor() {
        super('div', {
            attributes: {
                className: 'authorization',
            },
            heading: 'Регистрация',
            form: new Form(form),
            secondaryActionText: 'Уже зарегистрированы?',
            navLink: new NavLink({ pathname: '/', text: 'Войти' })
        });
    }

    render() {
        return compileTemplate(template, this.props);
    }
}
