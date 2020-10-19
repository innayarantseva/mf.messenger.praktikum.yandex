import { Block, BlockProps } from '../../lib/Block';
import { template } from './template';
import {
    signUpForm as form
} from './data';
import { compileTemplate } from '../../lib/templator';
import { Form } from '../../components/Form/index';
import { NavLink } from '../../components/NavLink/index';
import './styles.css';


export class SignUp extends Block<BlockProps> {
    constructor() {
        super('div', {
            attributes: {
                className: 'authorization'
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
