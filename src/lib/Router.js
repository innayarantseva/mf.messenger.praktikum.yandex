function renderToDom(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

class Route {
    // _pathname: string;
    // _blockClass;
    // _block;
    // _props;

    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            renderToDom(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

export class Router {
    // routes: Route[];
    // history: History;
    // _currentRoute: Route;
    // _rootQuery: string;

    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname, block) {
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery,
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

    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        // route.render(route, pathname);
        route.render();
    }

    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
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

// // Можно обновиться на /user и получить сразу пользователя
// router
//   .use("/", Chats)
//   .use("/users", Users)
//   .start();

// // Через секунду контент изменится сам, достаточно дернуть переход
// setTimeout(() => {
//   router.go("/users");
// }, 1000);

// // А можно и назад
// setTimeout(() => {
//   router.back();
// }, 3000);

// // И снова вперед
// setTimeout(() => {
//   router.forward();
// }, 5000);

//     Очередной модуль для проекта готов. Вы можете доработать его и слушать
//     событие <code class="code-inline code-inline_theme_light">hashchange</code>{' '}
//     (
//     <a
//         href="https://developer.mozilla.org/ru/docs/Web/API/Window/hashchange_event"
//         target="_blank"
//     >
//         документация на mdn
//     </a>
//     ), реализовав{' '}
//     <code class="code-inline code-inline_theme_light">HashRouter</code>. Он
//     удобен в SPA-приложениях, когда работа происходит в рамках одной страницы.
