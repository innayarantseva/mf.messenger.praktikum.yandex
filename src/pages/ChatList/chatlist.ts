import { Block, BlockProps } from '../../lib/Block.js';
import { chatsTemplate } from './template.js';
import { user, chats, conversations } from './data.js';
import { compileTemplate } from '../../lib/templator.js';
import { ChatListItem, CHAT_CLASS, } from '../../components/ChatListItem/index.js';
import { Conversation } from '../../components/Conversation/index.js';
import { NavLink } from '../../components/NavLink/index.js';
import { router } from '../../lib/Router.js';

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
        const conversation = new Conversation(data || conversations['Константин Константинопльский']);
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
