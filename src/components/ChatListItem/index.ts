import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';
import { Avatar } from '../Avatar';

import { chatTemplate } from './template';
export { CHAT_CLASS } from './consts';
import './styles.css';

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
        onClick = (event?) => undefined,
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
