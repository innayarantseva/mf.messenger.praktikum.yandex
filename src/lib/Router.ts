export const APP_ROOT_QUERY = '.app';

export function renderToDom(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

export class Route {
    _pathname: string;
    _blockClass;
    _block;
    _props: {
        rootQuery: string;
        blockProps
    };

    constructor(pathname: string, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    render(newBlockProps = undefined): void {
        if (!this._block) {
            this._block = new this._blockClass(this._props.blockProps);
            renderToDom(this._props.rootQuery, this._block);
            return;
        } else if (newBlockProps) {
            this._block.setProps(newBlockProps);
        }

        this._block.show();
    }
}

export class Router {
    routes: Route[];
    history: History;
    _currentRoute: Route;
    _rootQuery: string;

    constructor(rootQuery) {
        // чтобы typescript не ругался на то, что __instance не существует в typeof Router
        const proto = Object.getPrototypeOf(this);

        if (proto.__instance) {
            return proto.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        proto.__instance = this;
    }

    use(pathname, block, blockProps = undefined) {
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery,
            blockProps
        });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = ((event) => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname, newBlockProps = undefined) {
        const route = this.getRoute(pathname);

        if (!route) {
            // можно добавить 404?..
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(newBlockProps);
    }

    go(pathname, newBlockProps = undefined) {
        // логика: если зашли по /chats, проверить авторизацию
        // если не авторизован, перейти на /
        // если зашли на / или /sign-up и авторизованы
        // перейти на /chats

        // куда лучше поместить эту логику?



        this.history.pushState({}, '', pathname);
        this._onRoute(pathname, newBlockProps);
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }

    getRoute(pathname) {
        return this.routes.find((route) => route.match(pathname));
    }
}


export const router = new Router(APP_ROOT_QUERY);
