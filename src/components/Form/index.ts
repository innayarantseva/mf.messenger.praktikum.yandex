import { Block, BlockProps } from '../../lib/Block.js';
import { compileTemplate } from '../../lib/templator.js';
import { Button, ButtonProps } from '../Button/index.js';
import { FormField, FormFieldProps } from '../Formfield/index.js';
import { template } from './template.js';
// в идеале хочу импортить в компонент стили через css-модули из postcss

export type FormProps = {
    fields: FormFieldProps[];
    buttonProps: ButtonProps;
    className?: string;
};

export class Form extends Block<BlockProps> {
    props: BlockProps;

    constructor({ fields, buttonProps, className = '' }: FormProps) {
        const Fields = fields.map((field) => new FormField(field));

        super('div', {
            fields: Fields,
            button: new Button({
                ...buttonProps,
                onClick: (event) => {
                    event.preventDefault();
                    console.log(Fields.map((field) => field.validate()));
                },
            }),
            attributes: {
                className,
            },
        });
    }

    render() {
        return compileTemplate(template, this.props);
    }
}
