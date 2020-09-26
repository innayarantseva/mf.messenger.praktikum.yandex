import { Block, BlockProps } from '../../lib/Block.js';
import { template } from './template.js';
import { signInForm as form } from './data.js';
import { compileTemplate } from '../../lib/templator.js';
import { Form } from '../../components/Form/index.js';
import { NavLink } from '../../components/NavLink/index.js';

export class SignIn extends Block<BlockProps> {
    constructor() {
        super('div', {
            attributes: {
                className: 'authorization',
            },
            heading: 'Вход',
            form: new Form(form),
            secondaryActionText: 'Нет аккаунта?',
            navLink: new NavLink({ pathname: '/sign-up', text: 'Зарегистрироваться' })
        });
    }

    render() {
        return compileTemplate(template, this.props);
    }
}
