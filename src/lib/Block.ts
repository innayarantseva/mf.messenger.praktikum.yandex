import { EventBus } from './EventBus.js';
import { render as renderTemplate } from './templator/templator.js';

export type BlockProps = {
    classNames?: string[];
    onClick?: (event) => void;
};

// пока не густо по типам, но всё впереди!
export class Block<T extends BlockProps> {
    eventBus: () => EventBus;
    props: T;
    _element: HTMLElement = null;
    _node: { type: string; props: []; children: [] } = null;
    _meta = null;

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    constructor(tagName = 'div', props: T) {
        const eventBus = new EventBus();

        this._meta = {
            tagName,
            classNames: props.classNames,
            props,
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName, classNames } = this._meta;
        this._element = this._createDocumentElement(tagName);

        // классы нужно будет обрабатывать вместе с перерендером, так как они могут меняться
        if (classNames) {
            for (const className of classNames) {
                this._element.classList.add(className);
            }
        }
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount(oldProps) {
        this.componentDidMount(oldProps);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps) {}

    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);

        console.log('update', { response, oldProps, newProps });

        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }

        return response;
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    setProps = (nextProps) => {
        console.log(nextProps);

        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);

        console.log(this.props);

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    get node() {
        return this._node;
    }

    _render() {
        // процесс рендера возвращает виртуальное дерево элементов
        const newNode = this.render();

        // рендерим виртуальную ноду в элемент, сверяя старое и новое дерево, делая только необходимые замены в доме
        renderTemplate(this._element, newNode, this._node);

        // всегда храним виртуальную ноду для того, чтобы сравнивать её с новой
        this._node = newNode;
    }

    // Может переопределять пользователь, необязательно трогать
    render(): { type: string; props: []; children: [] } {
        return null;
    }

    getContent() {
        return this.element;
    }

    getNode() {
        return {
            type: this._meta.tagName,
            props: {},
            children: [this.node],
        };
    }

    _makePropsProxy(props: T) {
        const self = this;

        const propsProxy = new Proxy(props, {
            set(target, prop, value) {
                if (self.props[prop] !== value) {
                    self.eventBus().emit(Block.EVENTS.FLOW_RENDER);
                }

                target[prop] = value;
                return true;
            },

            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });

        return propsProxy;
    }

    _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = 'block';
    }

    hide() {
        this.getContent().style.display = 'none';
    }
}
