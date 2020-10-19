import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';
import { router } from '../../lib/Router';
import { pageNotification } from '../../lib/showNotification';
import { getRequestFromValidationResult } from '../../utils/formValidation';
// components
import { Button } from '../../components/Button';
import { NavLink } from '../../components/NavLink';
import { Avatar } from '../../components/Avatar';
import { Form, FormProps } from '../../components/Form';
// data
import { userSettingsTemplate } from './template';
import { getValue } from '../../store/store';
// api
import { updateUserAvatar } from '../../api/user';
import { getUserInfo, logOut } from '../../api/authorization';
// styles
import './styles.css';


const getAvatarFormData = (onClick): FormProps => ({
    fields: [
        {
            label: 'Выбрать новый аватар',
            inputProps: {
                type: 'file',
                accept: 'image/jpeg',
                required: true,
                'data-field-name': 'file'
            }
        }
    ],
    buttonProps: {
        text: 'Загрузить',
        type: 'submit',
        onClick
    }
});

export class UserProfile extends Block<BlockProps> {
    props: {
        avatar
    }

    constructor() {
        const handleCreateChatFormSubmit = (event, validationResult) => {
            const { isValid, request } = getRequestFromValidationResult(validationResult);

            if (isValid) {
                const formData = new FormData();

                formData.append('avatar', request.file[0]);

                updateUserAvatar(formData)
                    .then((res) => {
                        if (res.ok) {
                            getUserInfo()
                                .then((res) => {
                                    if (res.ok) {
                                        pageNotification.showNotification({
                                            text: 'Успешно обновили аватарку! Перезагрузите страничку, чтобы убедиться',
                                            type: 'info'
                                        });
                                        // this.setProps({ avatar: (res.response as { avatar }).avatar });
                                    }
                                })
                        }
                    });
            }
        };
        const {
            currentUser: {
                first_name,
                second_name,
                display_name,
                email,
                login,
                phone,
                avatar
            }
        } = getValue();
        const name = `${first_name} ${second_name}`;

        super('article', {
            attributes: {
                className: 'user-profile'
            },
            // data
            name,
            displayName: display_name || name,
            email,
            login,
            phone,
            avatar,

            // template components
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
            avatarForm: new Form(getAvatarFormData(handleCreateChatFormSubmit)),
            button: new Button({
                text: 'Изменить данные',
                className: 'user-settings__change-data'
            })
        });
    }



    render() {
        const avatar = new Avatar({
            isOnline: false,
            className: 'user-profile__avatar',
            source: this.props.avatar
        });

        return compileTemplate(userSettingsTemplate, { ...this.props, avatar });
    }
}
