import { Button } from '../../components/Button/index.js';
import { Block, BlockProps } from '../../lib/Block.js';
import { userSettingsTemplate } from './template.js';
import { data } from './data.js';
import { compileTemplate } from '../../lib/templator.js';

type UserSettingsProps = BlockProps & {
    className: string;
    name: string;
    displayName: string;
    email: string;
    login: string;
    title: string;
    button: Button;
};

export class UserProfile extends Block<UserSettingsProps> {
    constructor() {
        super('div', {
            className: 'user-settings',
            name: data.userData.name,
            displayName: data.userData.displayName,
            email: data.userData.email,
            login: data.userData.login,
            title: data.title,
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

const userProfile = new UserProfile();

function renderToDom(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

renderToDom('.app', userProfile);
