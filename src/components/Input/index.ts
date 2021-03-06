import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';
import { validateInput } from '../../utils/formValidation';
import './styles.css';


export type InputProps = {
    type?;
    placeholder?;
    value?;
    'data-field-name'?;
    required?;
    className?: string;
    error?: string;
    accept?: string;
    onFocus?: (event) => void;
    onBlur?: (event) => void;
    onInput?: (event) => void;
};

type InputBlockProps = {
    attributes: InputProps;
};

export class Input extends Block<BlockProps> {
    props: BlockProps & {
        attributes: { className, onInput },
        error,
        value
    };

    constructor(props: InputProps) {
        super('input', {
            attributes: {
                ...props,
                className: [
                    'input',
                    `input_invalid_${Boolean(props.error)}`,
                    props.className
                ].join(' '),
                onInput: (event) => {
                    this.setProps({ value: event.target.value });
                }
            },
            error: props.error,
            value: props.value
        });
    }

    validate() {
        const inputType = (this.props as InputBlockProps).attributes.type;
        const value = inputType === 'file' ? (this._element as HTMLInputElement).files : (this.props as InputProps).value;
        const fieldName = (this.props as InputBlockProps).attributes[
            'data-field-name'
        ];
        const error = validateInput(value, inputType, fieldName) || '';

        this.setProps({ error });

        return { fieldName, error, value };
    }

    render() {
        return compileTemplate('', this.props);
    }
}
