import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';
import { router } from '../../lib/Router';
import { logOut } from '../../api/authorization';
// components
import { Button } from '../../components/Button';
import { NavLink } from '../../components/NavLink';
import { Avatar } from '../../components/Avatar';
// data
import { userSettingsTemplate } from './template';

import './styles.css';


export class UserProfile extends Block<BlockProps> {
    constructor({
        first_name,
        second_name,
        display_name,
        email,
        login,
        phone,
        avatar
    }) {
        const name = `${first_name} ${second_name}`;

        super('article', {
            attributes: {
                className: 'user-profile',
            },
            // data
            name,
            displayName: display_name,
            email,
            login,
            phone,

            // template components
            avatar: new Avatar({
                isOnline: false,
                className: 'user-profile__avatar',
                source: avatar
            }),
            chatsLink: new NavLink({ pathname: '/chats', text: '← Все чаты' }),
            settingsLink: new NavLink({ pathname: '/edit-profile', text: 'Изменить данные' }),
            passwordLink: new NavLink({ pathname: '/edit-password', text: 'Сменить пароль' }),
            signInLink: new Button({
                className: 'user-profile__log-out',
                text: 'Разлогиниться',
                onClick: () => {
                    logOut()
                        .then((res) => {
                            if (res && res.ok) {
                                router.go('/');
                            }
                        });
                }
            }),
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
