import { Block, BlockProps } from '../../lib/Block';
import { chatsTemplate, chatsContainer, noChats } from './template';
import { compileTemplate } from '../../lib/templator';
import { ChatListItem } from '../../components/ChatListItem';
import { NavLink } from '../../components/NavLink';
import { Form, FormProps } from '../../components/Form';
import { createChat, getChats, getChatUsers } from '../../api/chats';
// import { NewChatForm } from './data';
import { ChatSettings } from '../../components/ChatSettings';
import { Avatar } from '../../components/Avatar';
import { getRequestFromValidationResult } from '../../utils/formValidation';
// import { getRequestFromValidationResult } from '../../utils/formValidation';
// import { createChat } from '../../api/chats';
// import { FormProps } from '../../components/Form';
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
                        'data-field-name': 'title',
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

    constructor(data) {
        const chatsContainer = new ChatsList(data.chats);

        const name = data.userData.display_name || `${data.userData.first_name} ${data.userData.second_name}`

        super('div', {
            attributes: {
                className: 'chats',
            },

            data,

            chatsContainer,
            avatar: new Avatar({ source: data.userData.avatar }),
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
