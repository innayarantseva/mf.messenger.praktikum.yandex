import { Block, BlockProps } from '../../lib/Block.js';
import { compileTemplate } from '../../lib/templator/templator.js';
// в идеале хочу импортить в компонент стили через css-модули из postcss

const template = '<div>{{text}}</div>';

type ButtonProps = BlockProps & {
    type?: 'button' | 'reset' | 'submit';
    text: string;
};

export class Button extends Block<ButtonProps> {
    props: ButtonProps;

    constructor(props: ButtonProps) {
        super('button', {
            ...props,
            classNames: ['button', ...(props.classNames || [])],
        });
    }

    render() {
        return <{ type: string; props: []; children: [] }>(
            compileTemplate(template, this.props)
        );
    }
}
