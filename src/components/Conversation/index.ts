import { Block, BlockProps } from '../../lib/Block.js';
import { template } from './template.js';
import { compileTemplate } from '../../lib/templator.js';
import { Avatar } from '../Avatar/index.js';
// import { ChatListItem } from '../../components/ChatListItem/index.js';

class Header extends Block<BlockProps> {
    constructor({ isOnline, title }) {
        super('header', {
            attributes: {
                className: 'conversation__header',
            },
            title,
            isOnline,
            avatar: new Avatar({ isOnline }),
        });
    }

    componentDidUpdate(oldProps, newProps) {
        // if (oldProps.isOnline !== newProps.isOnline) {
        (this.props as BlockProps & { avatar: Avatar }).avatar.setProps({
            isOnline: newProps.isOnline,
        }); // FIXME: написать норм типы
        // }

        return true;
    }
    render() {
        return compileTemplate(
            `<div>
        {{avatar}}

        <div class="conversation__info">
            <h3 class="conversation__title">{{title}}</h3>
        </div>

        </div>`,
            this.props
        );
    }
}

export class Conversations extends Block<BlockProps> {
    constructor({
        title = '',
        isOnline = false,
        description = '',
        conversations = undefined,
    }) {
        super('article', {
            attributes: {
                className: 'conversation',
            },
            // header: new Header({ isOnline, title }),
            title,
            isOnline,
            description,
            threads: 'messages!',
            conversations,
            avatar: new Avatar({ isOnline }),
        });
    }

    // componentDidUpdate(oldProps, newProps) {
    //     console.log(newProps.conversations);
    //     // (this.props as BlockProps & { header: Header }).header.setProps({
    //     //     isOnline: newProps.isOnline,
    //     //     title: newProps.title,
    //     // }); // FIXME: написать норм типы
    //     // console.log(newProps.isOnline);
    //     (this.props as BlockProps & { avatar: Avatar }).avatar.setProps({
    //         isOnline: newProps.isOnline,
    //     }); // FIXME: написать норм типы

    //     // return true;
    //     return false;
    // }

    render() {
        // console.log(compileTemplate(template, this.props), { ...this.props });
        return compileTemplate(template, this.props);
        // return compileTemplate('<div>{{header}}</div>', this.props);
    }
}
