import { Block, BlockProps } from '../../lib/Block.js';
import { compileTemplate } from '../../lib/templator.js';
import { Input, InputProps } from '../Input/index.js';
import { template } from './template.js';
import { validateInput } from '../../utils/formValidation.js';

// в идеале хочу импортить в компонент стили через css-модули из postcss

export type FormFieldProps = {
    className?: string;
    label: string;
    inputProps?: InputProps;
    input?: Input;
    error?: string;
};

export class FormField extends Block<BlockProps> {
    props: BlockProps;

    constructor({
        error = '',
        inputProps = {},
        label,
        className = '',
    }: FormFieldProps) {
        super('div', {
            label,
            inputProps,
            input: new Input({
                ...inputProps,
                onFocus: (event) => {
                    const error = validateInput(
                        event.target.value,
                        inputProps.type,
                        inputProps['data-field-name']
                    );

                    this.setProps({ error: error || '' });
                },
                onBlur: (event) => {
                    const error = validateInput(
                        event.target.value,
                        inputProps.type,
                        inputProps['data-field-name']
                    );

                    this.setProps({ error: error || '' });
                },
            }),
            error,
            attributes: {
                className,
            },
        });
    }

    validate() {
        const { fieldName, error, value } = (this
            .props as FormFieldProps).input.validate();

        this.setProps({ error: error || '' });

        return { fieldName, error, value };
    }

    render() {
        return compileTemplate(template, this.props);
    }
}
