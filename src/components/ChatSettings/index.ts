import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';
import { pageNotification } from '../../lib/showNotification';
// components
import { getRequestFromValidationResult } from '../../utils/formValidation';
import { Avatar } from '../Avatar';
import { Form, FormProps } from '../Form';
import { Button } from '../Button';
// data
import { chatUserTemplate, foundUsersTemplate, searchUserTemplate, template } from './template';
// api
import { addNewUsersToChat, deleteUsersFromChat, getChatUsers } from '../../api/chats';
import { searchUserByLogin } from '../../api/user';
// styles
import './styles.css';


class User extends Block<BlockProps> {
    _avatar
    props: {
        name,
        id,
        avatar,
        action,
        onClick
    }

    constructor({ name, id, avatar, action, onClick }) {
        super('li', {
            attributes: {
                className: 'chat-user'
            },
            name,
            id,
            avatar,
            action,
            onClick
        });
    }

    componentDidMount() {
        this._element.addEventListener('click', () => this.props.onClick && this.props.onClick(this.props.id));
    }

    render() {
        const avatar = new Avatar({ source: this.props.avatar });
        return compileTemplate(
            chatUserTemplate,
            {
                avatar,
                name: this.props.name,
                action: this.props.action,
                disabled: !this.props.onClick
            }
        );
    }
}

class AddNewUser extends Block<BlockProps> {
    props: {
        foundUsers,
        searchUsers: boolean,
        addUser
    }
    _button

    constructor({ foundUsers, addUser }) {
        super('section', { foundUsers, searchUsers: false, addUser });
    }

    get searchUserFormData(): FormProps {
        const handleCreateChatFormSubmit = (event, validationResult) => {
            const { isValid, request } = getRequestFromValidationResult(validationResult);

            if (isValid) {
                searchUserByLogin(request)
                    .then((response) => {
                        if (response.ok) {
                            this.setProps({ foundUsers: response.response });
                        }
                    });
            }
        };

        return ({
            fields: [
                {
                    label: 'Поиск по логину',
                    inputProps: {
                        type: 'text',
                        placeholder: 'Введите логин',
                        required: true,
                        'data-field-name': 'login'
                    }
                }
            ],
            buttonProps: {
                text: 'Найти',
                onClick: handleCreateChatFormSubmit,
                type: 'submit'
            }
        });
    }

    render() {

        const searchUserForm = new Form(this.searchUserFormData);
        const foundUsers = this.props.foundUsers.map(({
            display_name,
            first_name,
            second_name,
            id,
            avatar
        }) => {
            const name = display_name || `${first_name} ${second_name}`;

            return new User({
                name, id, avatar, action: 'Добавить', onClick: () => {
                    this.props.addUser(id);
                    this.setProps({ searchUsers: false, foundUsers: [] })
                }
            })
        });
        const button = new Button({ text: 'Добавить нового пользователя', onClick: () => this.setProps({ searchUsers: true }) })
        const cancelButton = new Button({ text: 'Отменить', onClick: () => this.setProps({ searchUsers: false, foundUsers: [] }) })

        return this.props.foundUsers.length
            ? compileTemplate(foundUsersTemplate, { foundUsers, cancelButton })
            : this.props.searchUsers
                ? compileTemplate(searchUserTemplate, { searchUserForm })
                : compileTemplate('<div>{{button}}</div>', { button });
    }
}

export class ChatSettings extends Block<BlockProps> {
    _avatar: Avatar;
    props: {
        title,
        id,
        users,
        searchUsers,
        foundUsers,
        avatar
    }

    constructor({
        title = '',
        id,
        users = [],
        foundUsers = [],
        avatar
    }) {
        super('article', {
            attributes: {
                className: 'chat-settings'
            },
            // data
            title,
            id,
            users,
            searchUsers: false,
            foundUsers,
            avatar
        });
    }

    render() {
        const deleteUser = (id) => {
            deleteUsersFromChat({
                users: [id],
                chatId: this.props.id
            }).then((res) => {
                if (res.ok) {
                    getChatUsers(this.props.id).then((res) => {
                        if (res.ok) {
                            this.setProps({ users: res.response });
                        }
                        pageNotification.showNotification({
                            text: 'Успешно удалили пользователя',
                            type: 'info'
                        })
                    });
                }
            });
        }

        const addUser = (id) => {
            addNewUsersToChat({
                users: [id],
                chatId: this.props.id
            }).then((res) => {
                if (res.ok) {
                    getChatUsers(this.props.id).then((res) => {
                        if (res.ok) {
                            this.setProps({ users: res.response });
                        }
                        pageNotification.showNotification({
                            text: 'Успешно добавили пользователя',
                            type: 'info'
                        })
                    });
                }
            });
        };

        const avatar = new Avatar({ source: this.props.avatar });

        const usersList = this.props.users.map(({
            display_name,
            first_name,
            second_name,
            id,
            avatar
        }) => {
            const name = display_name || `${first_name} ${second_name}`;

            return new User({
                name, id, avatar, action: 'Удалить', onClick: this.props.users.length > 1 && deleteUser
            })
        });

        const addUserContainer = new AddNewUser({ foundUsers: this.props.foundUsers, addUser });

        const renderContext = {
            title: this.props.title,
            avatar,
            usersList,
            addUserContainer
        }

        return compileTemplate(template, renderContext);
    }
}
