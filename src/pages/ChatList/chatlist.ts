import { Block, BlockProps } from '../../lib/Block';
import { chatsTemplate, chatsContainer, noChats } from './template';
import { compileTemplate } from '../../lib/templator';
import { ChatListItem } from '../../components/ChatListItem';
import { NavLink } from '../../components/NavLink';
import { Form } from '../../components/Form';
import { getChatUsers } from '../../api/chats';
import { NewChatForm } from './data';
import { Conversation } from '../../components/Conversation';
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
                        console.log(id);
                        getChatUsers(id)
                            .then((res) => {
                                if (res.ok) {
                                    this.setProps({
                                        conversation: {
                                            title: chat.title,
                                            users: res.response
                                        }
                                    })
                                }
                            })
                    }
                })
            );

            const conversationContainer = this.props.conversation
                ? new Conversation(this.props.conversation)
                : new Empty();

            return compileTemplate(chatsContainer, { chatList, conversationContainer })
        }
    }
}

export class Chats extends Block<BlockProps> {
    _chatsContainer

    constructor(data) {

        const chatsContainer = new ChatsList(data.chats);

        super('div', {
            attributes: {
                className: 'chats',
            },

            data,

            chatsContainer,
            settingsLink: new NavLink({
                pathname: '/profile',
                text: data.userData.display_name,
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
