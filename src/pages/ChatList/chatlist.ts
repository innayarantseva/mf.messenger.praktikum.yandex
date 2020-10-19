import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';
import { getRequestFromValidationResult } from '../../utils/formValidation';
// components
import { ChatListItem } from '../../components/ChatListItem';
import { NavLink } from '../../components/NavLink';
import { Form, FormProps } from '../../components/Form';
import { ChatSettings } from '../../components/ChatSettings';
import { Avatar } from '../../components/Avatar';
// data
import { chatsTemplate, chatsContainer, noChats } from './template';
import { getValue } from '../../store/store';
// api
import { createChat, getChats, getChatUsers } from '../../api/chats';
// styles
import './styles.css';


class Empty extends Block<BlockProps> {
    constructor() {
        super('div', {
            attributes: {
                className: 'chats__empty'
            }
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
                className: 'chats-container'
            },
            chats
        });
    }

    get NewChatForm(): FormProps {
        const handleCreateChatFormSubmit = (event, validationResult) => {
            const { isValid, request } = getRequestFromValidationResult(validationResult);

            if (isValid) {
                createChat(request)
                    .then((response) => {
                        if (response.ok) {
                            getChats().then((res) => {
                                if (res.ok) {
                                    this.setProps({ chats: res.response });
                                }
                            })
                        }
                    });
            }
        };

        return {
            fields: [
                {
                    label: 'Название чата',
                    inputProps: {
                        type: 'text',
                        required: true,
                        'data-field-name': 'title'
                    }
                }
            ],
            buttonProps: {
                text: 'Создать новый чат',
                onClick: handleCreateChatFormSubmit,
                type: 'submit'
            }
        };
    }

    render() {
        if (!this.props.chats.length) {
            return compileTemplate(
                noChats,
                { createNewChatForm: new Form(this.NewChatForm) }
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

            const newChat = new Form(this.NewChatForm);

            // FIXME: сделать один инстанс и обновлять его
            const conversationContainer = this.props.conversation
                ? new ChatSettings(this.props.conversation)
                : new Empty();

            return compileTemplate(chatsContainer, { chatList, conversationContainer, newChat })
        }
    }
}

export class Chats extends Block<BlockProps> {
    _chatsContainer

    constructor(chats) {
        const chatsContainer = new ChatsList(chats);

        const { currentUser } = getValue();
        const name = `${currentUser.first_name} ${currentUser.second_name}`;

        super('div', {
            attributes: {
                className: 'chats'
            },

            currentUser,
            chats,

            chatsContainer,
            avatar: new Avatar({ source: currentUser.avatar }),
            settingsLink: new NavLink({
                pathname: '/profile',
                text: name,
                className: 'chats__user-name'
            })
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
