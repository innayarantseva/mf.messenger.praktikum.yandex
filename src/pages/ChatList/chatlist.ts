import { Block, BlockProps } from '../../lib/Block.js';
import { chatsTemplate } from './template.js';
import { user, chats, conversations } from './data.js';
import { compileTemplate } from '../../lib/templator.js';
import { ChatListItem, CHAT_CLASS, } from '../../components/ChatListItem/index.js';
import { Conversations } from '../../components/Conversation/index.js';
import { NavLink } from '../../components/NavLink/index.js';
import { router } from '../../lib/Router.js';

export class Chats extends Block<BlockProps> {
    _conversation: Conversations;

    constructor(data = conversations['Соня Соня']) {
        console.log(data);

        super('div', {
            attributes: {
                className: 'chats',
            },
            user,
            settingsLink: new NavLink({
                pathname: '/settings',
                text: user.displayName,
                className: 'chats__user-name'
            }),
            content: undefined,
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
            data,
            conversation: new Conversations(data),
        });
    }

    componentDidUpdate(oldProps, newProps) {
        console.log(newProps);
        if (!(oldProps.conversation instanceof Conversations)) {
            this.setProps({
                conversation: new Conversations(newProps.data),
            });
            return true;
        } else {
            console.log('update conversation props in chatlist');
            (this.props as BlockProps & {
                conversation;
            }).conversation.setProps(newProps.data);

            // return false;
            // return true; // почему в этот раз-то нужно перерендеривать... Ведь у нас уже есть ссылка на элемент, и мы просто меняем у него пропсы.
        }
        return false;
    }

    render() {
        return compileTemplate(chatsTemplate, this.props);
    }
}
