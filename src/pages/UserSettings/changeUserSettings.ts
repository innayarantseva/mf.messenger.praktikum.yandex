import { Block, BlockProps } from '../../lib/Block.js';
import { changeUserSettings } from './template.js';
import { form } from './data.js';
import { compileTemplate } from '../../lib/templator.js';
import { Form } from '../../components/Form/index.js';

export class ChangeUserData extends Block<BlockProps> {
    constructor() {
        super('div', {
            attributes: {
                className: 'user-settings',
            },
            form: new Form(form),
        });
    }

    render() {
        return compileTemplate(changeUserSettings, this.props);
    }
}

const userProfile = new ChangeUserData();

function renderToDom(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

renderToDom('.app', userProfile);
