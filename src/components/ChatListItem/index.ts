import { Block, BlockProps } from '../../lib/Block.js';
import { chatTemplate } from './template.js';
import { compileTemplate } from '../../lib/templator.js';
import { Avatar } from '../Avatar/index.js';

export { CHAT_CLASS } from './consts.js';

class Me extends Block<BlockProps> {
    constructor() {
        super('b', {
            attributes: {
                className: 'chats-list-item__me',
            },
        });
    }

    render() {
        return compileTemplate('Я:', this.props);
    }
}

class Badge extends Block<BlockProps> {
    constructor({ unreadCounter }: { unreadCounter: number }) {
        super('p', {
            attributes: {
                className: 'chats-list-item__badge',
            },
            unreadCounter,
        });
    }

    render() {
        return compileTemplate('{{unreadCounter}}', this.props);
    }
}

export class ChatListItem extends Block<BlockProps> {
    constructor({
        isOnline,
        displayName,
        unreadCounter = undefined,
        lastMessage,
        onClick = () => undefined,
    }) {
        super('div', {
            attributes: {
                className: 'chats',
                onClick,
            },
            avatar: new Avatar({ isOnline }),
            badge: unreadCounter ? new Badge({ unreadCounter }) : '',
            me: lastMessage.fromMe ? new Me() : '',
            lastMessage,
            displayName,
        });
    }

    render() {
        return compileTemplate(chatTemplate, this.props);
    }
}
