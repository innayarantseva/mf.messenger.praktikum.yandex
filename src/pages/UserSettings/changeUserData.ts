import { Block, BlockProps } from '../../lib/Block';
import { changeUserSettings } from './template';
import { form } from './data';
import { compileTemplate } from '../../lib/templator';
import { Form } from '../../components/Form/index';
import { NavLink } from '../../components/NavLink/index';

export class ChangeUserData extends Block<BlockProps> {
    constructor() {
        super('div', {
            attributes: {
                className: 'user-settings',
            },
            form: new Form(form),
            chatsLink: new NavLink({ pathname: '/chats', text: '← Все чаты' }),
            profileLink: new NavLink({ pathname: '/settings', text: 'Отменить' }),
        });
    }

    render() {
        return compileTemplate(changeUserSettings, this.props);
    }
}
