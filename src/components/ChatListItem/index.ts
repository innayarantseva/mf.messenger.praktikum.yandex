import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';
import { Avatar } from '../Avatar';

import { chatTemplate } from './template';
import './styles.css';


export class ChatListItem extends Block<BlockProps> {
    constructor({
        title,
        id,
        onClick = () => undefined
    }: {
        title: string;
        id: number;
        onClick: (id: number) => void,
    }) {
        super('li', {
            attributes: {
                onClick: () => onClick(id)
            },
            avatar: new Avatar({}),
            title
        });
    }

    render() {
        return compileTemplate(chatTemplate, this.props);
    }
}
