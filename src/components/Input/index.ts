import { Block, BlockProps } from '../../lib/Block.js';
import { compileTemplate } from '../../lib/templator.js';
// в идеале хочу импортить в компонент стили через css-модули из postcss

type InputProps = BlockProps & {
    type?;
    placeholder?;
    value?;
    'data-field-name'?;
    required?;
};

export class Input extends Block<InputProps> {
    props: InputProps;

    constructor(props: InputProps) {
        super('input', {
            ...props,
            className: ['input', props.className].join(' '),
        });
    }

    render() {
        return compileTemplate('', this.props);
    }
}
