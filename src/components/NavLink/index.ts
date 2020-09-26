import { router } from '../../lib/Router.js';
import { Block, BlockProps } from '../../lib/Block.js';
import { compileTemplate } from '../../lib/templator.js';

export class NavLink extends Block<BlockProps> {
    constructor({ pathname, text, className = '' }) {
        super('a', {
            attributes: {
                href: '#',
                onClick: (event) => {
                    event.preventDefault();
                    router.go(pathname);
                },
                className: ['navlink', className].join(' '),
            },
            text
        })
    }

    render() {
        return compileTemplate('<span>{{text}}</span>', this.props)
    }
}