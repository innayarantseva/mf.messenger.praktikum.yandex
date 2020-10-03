import { router } from '../../lib/Router';
import { Block, BlockProps } from '../../lib/Block';
import { compileTemplate } from '../../lib/templator';

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