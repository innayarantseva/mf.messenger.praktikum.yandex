import { Block, BlockProps } from '../../lib/Block.js';
import { errorTemplate } from './template.js';
import { error500 } from './500.js';
import { compileTemplate } from '../../lib/templator.js';

export class ErrorPage extends Block<BlockProps> {
    constructor() {
        super('section', {
            attributes: {
                className: 'error',
            },
            ...error500,
        });
    }

    render() {
        return compileTemplate(errorTemplate, this.props);
    }
}

const page = new ErrorPage();

function renderToDom(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

renderToDom('.app', page);
