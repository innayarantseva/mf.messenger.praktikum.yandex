import { Button } from '../../components/Button/index.js';
import { Block, BlockProps } from '../../lib/Block.js';
import { userSettingsTemplate } from './template.js';
import { data } from './data.js';
import { compileTemplate } from '../../lib/templator.js';
import { NavLink } from '../../components/NavLink/index.js';

export class UserProfile extends Block<BlockProps> {
    constructor() {
        super('div', {
            attributes: {
                className: 'user-settings',
            },
            name: data.userData.name,
            displayName: data.userData.displayName,
            email: data.userData.email,
            login: data.userData.login,
            title: data.title,
            chatsLink: new NavLink({ pathname: '/chats', text: '← Все чаты' }),
            settingsLink: new NavLink({ pathname: '/settings/change', text: 'Изменить данные' }),
            signInLink: new NavLink({ pathname: '/', text: 'Выйти', className: 'user-settings__log-out' }),
            button: new Button({
                text: 'Изменить данные',
                className: 'user-settings__change-data',
            }),
        });
    }

    render() {
        return compileTemplate(userSettingsTemplate, this.props);
    }
}
