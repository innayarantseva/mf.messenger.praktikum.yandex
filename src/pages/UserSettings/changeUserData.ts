import { Block, BlockProps } from '../../lib/Block';
import { changeUserSettings } from './template';
import { fields, buttonProps } from './data';
import { compileTemplate } from '../../lib/templator';
import { Form } from '../../components/Form/index';
import { FormProps } from '../../components/Form/index';
import { NavLink } from '../../components/NavLink/index';


const mapDatatoFormProps = (data): FormProps => {
    const formDataFields = fields.map((field) => ({
        ...field,
        inputProps: {
            ...field.inputProps,
            value: data[field.inputProps['data-field-name']]
        }
    }));

    return {
        fields: formDataFields,
        buttonProps
    };
}

export class ChangeUserData extends Block<BlockProps> {
    constructor(data) {
        super('div', {
            attributes: {
                className: 'user-settings',
            },
            form: new Form(mapDatatoFormProps(data)),
            chatsLink: new NavLink({ pathname: '/chats', text: '← Все чаты' }),
            profileLink: new NavLink({ pathname: '/profile', text: 'Отменить' }),
        });
    }

    render() {
        return compileTemplate(changeUserSettings, this.props);
    }
}
