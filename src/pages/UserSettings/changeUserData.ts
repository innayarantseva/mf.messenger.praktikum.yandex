import { Block, BlockProps } from '../../lib/Block.js';
import { changeUserSettings } from './template.js';
import { form } from './data.js';
import { compileTemplate } from '../../lib/templator.js';
import { Form } from '../../components/Form/index.js';
import { NavLink } from '../../components/NavLink/index.js';

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
