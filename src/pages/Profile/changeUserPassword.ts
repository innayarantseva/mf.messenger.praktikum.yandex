import { Block, BlockProps } from '../../lib/Block';
import { changeUserSettings } from './template';
import { passwordFields, passwordButtonProps } from './data';
import { compileTemplate } from '../../lib/templator';
import { Form } from '../../components/Form/index';
import { NavLink } from '../../components/NavLink/index';


export class ChangeUserPassword extends Block<BlockProps> {
    constructor() {
        super('div', {
            attributes: {
                className: 'user-settings'
            },
            form: new Form({ fields: passwordFields, buttonProps: passwordButtonProps }),
            chatsLink: new NavLink({ pathname: '/chats', text: '← Все чаты' }),
            profileLink: new NavLink({ pathname: '/profile', text: 'Отменить' })
        });
    }

    render() {
        return compileTemplate(changeUserSettings, this.props);
    }
}
