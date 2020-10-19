import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';
import { Avatar } from '../Avatar';
import { template } from './template';
import './styles.css';


const getUsersString = (users: { display_name, first_name, second_name }[]) => {
    return users.reduce((acc, { display_name, first_name, second_name }) => {
        const userName = display_name ? display_name : `${first_name} ${second_name}`;

        acc.push(userName);

        return acc;
    }, []);
}

export class Conversation extends Block<BlockProps> {
    _avatar: Avatar;

    constructor({
        title = '',
        users,
        isOnline = false
    }) {
        const avatar = new Avatar({ isOnline });

        super('article', {
            attributes: {
                className: 'conversation'
            },
            // data
            title,
            users: getUsersString(users),
            avatar
        });

        this._avatar = avatar;
    }

    componentDidMount() {
        const optionsButton = (this._element as HTMLElement).querySelector('.conversation__options');
        const optionsMenu = (this._element as HTMLElement).querySelector('.conversation__options-menu');

        if (optionsButton && optionsMenu) {
            optionsButton.addEventListener('click', () => {
                optionsMenu.classList.toggle('conversation__options-menu_opened_true');
            })
        }
    }


    // componentDidUpdate(oldProps, newProps) {
    //     if (!isEqual(oldProps.conversations, newProps.conversations)) {
    //         this._threads.splice(0, this._threads.length); // стираем старые данные

    //         newProps.conversations.forEach((thread) => { // добавляем новые
    //             this._threads.push(new Thread(thread));
    //         })

    //         // все проверки по одинаковости сделает сам блок
    //         this.setProps({ threads: this._threads });
    //         return true;
    //     }

    //     this._avatar.setProps({ isOnline: newProps.isOnline });

    //     return false;
    // }

    render() {
        return compileTemplate(template, this.props);
    }
}
