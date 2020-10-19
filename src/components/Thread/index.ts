import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';

import { Message } from '../Message';

import { template } from './template';
import './styles.css';


export class Thread extends Block<BlockProps> {
    _messages;

    constructor({ date, messages }) {
        const messagesBlocks = messages.map((message) => new Message(message));

        super('section', {
            attributes: {
                className: 'conversation__messages'
            },
            date,
            messages: messagesBlocks
        });

        this._messages = messages;
    }


    componentDidUpdate(oldProps, newProps) {
        if (oldProps.messages.length !== newProps.messages.length) {
            this._messages.splice(0, this._messages.length); // стираем старые данные

            newProps.messages.forEach((message) => { // добавляем новые
                this._messages.push(new Message(message));
            })

            // все проверки по одинаковости сделает сам блок
            this.setProps({ messages: this._messages });
            return true;
        }

        return false;
    }

    render() {
        return compileTemplate(template, this.props);
    }
}
