import { Block, BlockProps } from '../../lib/Block';
import { chatsTemplate } from './template';
import { user, chats, conversations } from './data';
import { compileTemplate } from '../../lib/templator';
import { ChatListItem, CHAT_CLASS, } from '../../components/ChatListItem';
import { Conversation } from '../../components/Conversation';
import { NavLink } from '../../components/NavLink';
import { router } from '../../lib/Router';
import './styles.css';

class Empty extends Block<BlockProps> {
    constructor() {
        super('div', {
            attributes: {
                className: 'chats__empty',
            },
        });
    }

    render() {
        return compileTemplate(
            'Чтобы начать переписку, выберите чат из меню слева',
            this.props
        );
    }
}

export class Chats extends Block<BlockProps> {
    _conversation: Conversation;
    _empty: Empty;

    constructor(data) {
        const conversation = new Conversation(data || conversations['Соня Соня']);
        const empty = new Empty();

        super('div', {
            attributes: {
                className: 'chats',
            },
            // data
            data,
            user,
            // blocks
            settingsLink: new NavLink({
                pathname: '/settings',
                text: user.displayName,
                className: 'chats__user-name'
            }),
            chatList: chats.map(
                (chat) =>
                    new ChatListItem({
                        ...chat,
                        onClick: (event) => {
                            const closestChatItemParent = (event.target as HTMLElement).closest(
                                `.${CHAT_CLASS}`
                            );

                            if (closestChatItemParent) {
                                const chatTitle = (closestChatItemParent as HTMLElement)
                                    .dataset.chatTitle;

                                router.go('/chats', { data: conversations[chatTitle] })
                            }
                        }
                    })
            ),
            conversation,
            empty
        });

        this._conversation = conversation;
        this._empty = empty;

        if (data) {
            this._empty.hide();
        } else {
            this._conversation.hide();
        }

    }

    componentDidUpdate(oldProps, newProps) {
        if (newProps.data) { // обновилась дата для блока разговора
            this._conversation.setProps(newProps.data);
            this._empty.hide();
            this._conversation.show();
        } else { // даты не пришло
            this._conversation.hide();
            this._empty.show();
        }

        return false;
    }

    render() {
        return compileTemplate(chatsTemplate, this.props);
    }
}
