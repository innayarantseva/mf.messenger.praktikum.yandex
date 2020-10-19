import { Block, BlockProps } from '../../lib/Block';
import { errorTemplate } from './template';
import { error404 } from './404';
import { compileTemplate } from '../../lib/templator';
import './styles.css';

export class ErrorPage extends Block<BlockProps> {
    constructor() {
        super('section', {
            attributes: {
                className: 'error',
            },
            ...error404,
        });
    }

    render() {
        return compileTemplate(errorTemplate, this.props);
    }
}
