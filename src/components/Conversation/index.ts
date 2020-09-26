import { Block, BlockProps } from '../../lib/Block.js';
import { template } from './template.js';
import { compileTemplate } from '../../lib/templator.js';
import { Avatar } from '../Avatar/index.js';
import { Thread } from '../Thread/index.js';
import { isEqual } from '../../utils/mydash/isEqual.js';


export class Conversation extends Block<BlockProps> {
    _avatar: Avatar;
    _threads: Thread[];

    constructor({
        title = '',
        isOnline = false,
        description = '',
        conversations = undefined,
    }) {
        const avatar = new Avatar({ isOnline });
        const threads = conversations.map(conversation => new Thread(conversation));

        super('article', {
            attributes: {
                className: 'conversation',
            },
            // data
            title,
            isOnline,
            description,
            conversations,
            // blocks
            threads,
            avatar
        });

        this._avatar = avatar;
        this._threads = threads;
    }


    componentDidUpdate(oldProps, newProps) {
        if (!isEqual(oldProps.conversations, newProps.conversations)) {
            this._threads.splice(0, this._threads.length); // стираем старые данные

            newProps.conversations.forEach((thread) => { // добавляем новые
                this._threads.push(new Thread(thread));
            })

            // все проверки по одинаковости сделает сам блок
            this.setProps({ threads: this._threads });
            return true;
        }

        this._avatar.setProps({ isOnline: newProps.isOnline });

        return false;
    }

    render() {
        return compileTemplate(template, this.props);
    }
}
