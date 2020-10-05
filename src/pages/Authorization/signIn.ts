import { Block, BlockProps } from '../../lib/Block';
import { template } from './template';
import { signInForm as form } from './data';
import { compileTemplate } from '../../lib/templator';
import { Form } from '../../components/Form/index';
import { NavLink } from '../../components/NavLink/index';
import './styles.css';

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
