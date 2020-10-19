import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';
import './styles.css';


const template = '<div>{{text}}</div>';

export type ButtonProps = {
    className?: string;
    type?: 'button' | 'reset' | 'submit';
    text: string;
    onClick?: (event, validationResult?) => void;
};

export class Button extends Block<BlockProps> {
    props: BlockProps;

    constructor({
        className = '',
        type = 'button',
        text,
        onClick
    }: ButtonProps) {
        super('button', {
            text,
            attributes: {
                className: ['button', className].join(' '),
                onClick,
                type
            }
        });
    }

    render() {
        return compileTemplate(template, this.props);
    }
}
