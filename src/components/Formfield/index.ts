import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';
import { validateInput } from '../../utils/formValidation';
import { Input, InputProps } from '../Input';
import { template } from './template';
import './styles.css';


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
        className = ''
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
                }
            }),
            error,
            attributes: {
                className: [className, 'formfield'].join(' ')
            }
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
