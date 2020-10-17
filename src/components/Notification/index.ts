import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';
import { template } from './template';
import './styles.css';

export type NotificationProps = {
    className?: string;
    text: string,
    // TODO: сделать type = warning | error | info
};

export class Notification extends Block<BlockProps> {
    props: BlockProps;

    constructor({ text, className = '' }: NotificationProps) {
        super('div', {
            text,
            attributes: {
                // TODO: добавить утилиту classnames
                className: [
                    'notification',
                    'notification-type-error',
                    className
                ].join(' '),
            },
        });

        // add event listener for close button
        const closeButton = (this._element as HTMLElement).querySelector('.notification__icon-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.hide();
            })
        }
    }


    render() {
        return compileTemplate(template, this.props);
    }
}
