import { Block, BlockProps } from '../../lib/Block';
import { chatsTemplate, chatsContainer, noChats } from './template';
import { compileTemplate } from '../../lib/templator';
import { ChatListItem } from '../../components/ChatListItem';
import { NavLink } from '../../components/NavLink';
import { Form } from '../../components/Form';
import { getChatUsers } from '../../api/chats';
import { NewChatForm } from './data';
import { ChatSettings } from '../../components/ChatSettings';
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


class ChatsList extends Block<BlockProps> {
    props: {
        chats,
        foundUsers,
        conversation
    }

    constructor(chats = []) {
        super('div', {
            attributes: {
                className: 'chats-container',
            },
            chats
        });
    }

    render() {
        if (!this.props.chats.length) {
            return compileTemplate(
                noChats,
                { createNewChatForm: new Form(NewChatForm) }
            );
        } else {
            const chatList = this.props.chats.map((chat) =>
                new ChatListItem({
                    ...chat,
                    onClick: (id) => {
                        getChatUsers(id)
                            .then((res) => {
                                if (res.ok) {
                                    this.setProps({
                                        conversation: {
                                            id,
                                            title: chat.title,
                                            users: res.response
                                        }
                                    })
                                }
                            })
                    }
                })
            );

            // FIXME: сделать один инстанс и обновлять его
            const conversationContainer = this.props.conversation
                ? new ChatSettings(this.props.conversation)
                : new Empty();

            return compileTemplate(chatsContainer, { chatList, conversationContainer })
        }
    }
}

export class Chats extends Block<BlockProps> {
    _chatsContainer

    constructor(data) {
        const chatsContainer = new ChatsList(data.chats);

        const name = data.userData.display_name || `${data.userData.first_name} ${data.userData.second_name}`

        super('div', {
            attributes: {
                className: 'chats',
            },

            data,

            chatsContainer,
            settingsLink: new NavLink({
                pathname: '/profile',
                text: name,
                className: 'chats__user-name'
            }),
        });

        this._chatsContainer = chatsContainer;
    }

    componentDidUpdate(oldProps, newProps) {
        if (newProps.chats) {
            this._chatsContainer.setProps(newProps.chats);
        }

        return false;
    }

    render() {
        return compileTemplate(chatsTemplate, this.props);
    }
}
