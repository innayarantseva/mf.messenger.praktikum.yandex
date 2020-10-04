import { Block, BlockProps } from '../../lib/Block';
import { errorTemplate } from './template';
import { error500 } from './500';
import { compileTemplate } from '../../lib/templator';
import './styles.css';

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
