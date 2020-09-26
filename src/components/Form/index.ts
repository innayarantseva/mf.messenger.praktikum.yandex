import { Block, BlockProps } from '../../lib/Block.js';
import { compileTemplate } from '../../lib/templator.js';
import { Button, ButtonProps } from '../Button/index.js';
import { FormField, FormFieldProps } from '../Formfield/index.js';
import { template } from './template.js';

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

                    const validationResult = Fields.map((field) => field.validate());
                    // не знаю, нужно ли оставлять — это задание из прошлого спринта
                    console.log(validationResult);

                    buttonProps.onClick && buttonProps.onClick(event, validationResult);
                },
            }),
            attributes: {
                className: [className, 'form'].filter(v => !!v).join(' '),
            },
        });
    }

    render() {
        return compileTemplate(template, this.props);
    }
}
