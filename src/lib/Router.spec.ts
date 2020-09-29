import { Block, BlockProps } from './Block';
import { Route, Router } from './Router';

class MyBlock extends Block<BlockProps> {
    constructor({ className }) {
        super('div', { attributes: { className } });
    }

    render() {
        return {
            type: 'span',
            props: {},
            children: []
        };
    }
};
const blockProps = { className: 'my-class' };
const rootQuery = '.app';

document.body.innerHTML =
    '<div class="app">' +
    '</div>';



describe('Route class basic functions', () => {
    const pathname = '/pathname';
    const route = new Route(pathname, MyBlock, { blockProps, rootQuery });

    test('creates a Route instance for Block', () => {
        expect(route._pathname).toBe(pathname);
        expect(route._blockClass).toBe(MyBlock);
        expect(route._block).toBeNull();
        expect(route._props).toEqual({ blockProps, rootQuery });
    });

    test('matches its pathname', () => {
        expect(route.match(pathname)).toBeTruthy();
        expect(route.match('/someOtherPath')).toBeFalsy();
    });

    test('navigates to its pathname', () => {
        const spyOnMatch = jest.spyOn(route, 'match');
        const spyOnRender = jest.spyOn(route, 'render');

        route.navigate(pathname);

        expect(spyOnMatch).toHaveBeenCalledTimes(1);
        expect(spyOnRender).toHaveBeenCalledTimes(1);
    });

    test('hides block when leave() is called', () => {
        route.leave();

        expect(
            route._block.getContent().style.display
        ).toBe('none');
    });

    test('renders block for the first time', () => {
        route.render();

        expect(route._block).toBeInstanceOf(MyBlock);
        expect(document.querySelector(rootQuery).innerHTML).toBeTruthy();
    });

    test('shows block if it has been already rendered', () => {
        route.render();

        expect(
            route._block.getContent().style.display
        ).toBe('flex');
    });

    test('updates block props when new props are received', () => {
        const spyOnSetProps = jest.spyOn(route._block, 'setProps');

        route.render({ class: 'my-new-class' });

        expect(spyOnSetProps).toHaveBeenCalledTimes(1);
        expect(
            route._block.getContent().style.display
        ).toBe('flex');
    });
});

describe('Router class basic functions', () => {
    test.todo('Router tests');
})

