import { Block, BlockProps } from '../../lib/Block';
import { messageTemplate } from './template';
import { compileTemplate } from '../../lib/templator';

export class Message extends Block<BlockProps> {
    _messages;

    constructor({ time, direction, text }) {
        super('section', {
            attributes: {
                className: `message__container message_direction_${direction}`,
            },
            time, direction, text
        });
    }

    render() {
        return compileTemplate(messageTemplate, this.props);
    }
}
