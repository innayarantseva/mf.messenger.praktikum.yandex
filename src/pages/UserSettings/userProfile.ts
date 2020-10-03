import { Button } from '../../components/Button/index';
import { Block, BlockProps } from '../../lib/Block';
import { userSettingsTemplate } from './template';
import { data } from './data';
import { compileTemplate } from '../../lib/templator';
import { NavLink } from '../../components/NavLink/index';

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
