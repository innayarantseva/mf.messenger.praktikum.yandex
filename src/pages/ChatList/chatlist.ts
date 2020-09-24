import { Block, BlockProps } from '../../lib/Block.js';
import { chatsTemplate } from './template.js';
import { user, chats } from './data.js';
import { compileTemplate } from '../../lib/templator.js';
import {
    ChatListItem,
    // CHAT_CLASS,
} from '../../components/ChatListItem/index.js';
import { Conversations } from '../../components/Conversation/index.js';
// import { isEqual } from '../../utils/mydash/isEqual.js';

// type Chatprops = {
//     attributes;
//     user;
//     content;
//     chatList;
//     conversation;
// };

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
    _conversation: Conversations;

    constructor(data) {
        const conversation = new Conversations({});
        super('div', {
            attributes: {
                className: 'chats',
            },
            user,
            content: undefined,
            chatList: chats.map(
                (chat) =>
                    new ChatListItem({
                        ...chat,
                        // onClick: (event) => {
                        //     const closestChatItemParent = (event.target as HTMLElement).closest(
                        //         `.${CHAT_CLASS}`
                        //     );

                        //     if (closestChatItemParent) {
                        //         const chatTitle = (closestChatItemParent as HTMLElement)
                        //             .dataset.chatTitle;

                        //         this.setProps({
                        //             content: conversations[chatTitle],
                        //         });
                        //     }
                        // },
                    })
            ),
            conversation: data ? new Conversations(data) : new Empty(),
        });

        this._conversation = conversation;
    }

    // componentDidUpdate(oldProps, newProps) {
    //     if (!(oldProps.conversation instanceof Conversations)) {
    //         this.setProps({
    //             conversation: new Conversations(newProps.content),
    //         });
    //         return true;
    //     } else {
    //         console.log('update conversation props in chatlist');
    //         (this.props as BlockProps & {
    //             conversation;
    //         }).conversation.setProps(newProps.content);

    //         // return false;
    //         return true; // почему в этот раз-то нужно перерендеривать... Ведь у нас уже есть ссылка на элемент, и мы просто меняем у него пропсы.
    //     }
    // }

    render() {
        // console.log(compileTemplate(chatsTemplate, this.props));
        // console.log('render chatlist');
        return compileTemplate(chatsTemplate, this.props);
    }
}

// const page = new Chats();

// function renderToDom(query, block) {
//     const root = document.querySelector(query);
//     root.appendChild(block.getContent());
//     return root;
// }

// renderToDom('.app', page);
