import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';
import './styles.css';

class Indicator extends Block<BlockProps> {
    constructor() {
        super('div', {
            attributes: {
                className: 'avatar-indicator',
            },
        });
    }

    render() {
        return compileTemplate('', this.props);
    }
}

export class Avatar extends Block<BlockProps> {
    constructor({ isOnline }: { isOnline: boolean }) {
        super('div', {
            attributes: {
                className: 'avatar',
            },
            isOnline,
            indicator: new Indicator(),
        });
    }

    render() {
        return compileTemplate(
            '<div class="avatar-online-{{isOnline}}">{{indicator}}</div>',
            this.props
        );
    }
}
