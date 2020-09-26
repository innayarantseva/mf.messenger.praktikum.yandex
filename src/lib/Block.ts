import { EventBus } from './EventBus.js';

export type BlockProps = object;

export type BlockNode = {
    type: string;
    props: Record<string, string | number | boolean | Function>;
    children: BlockNode[];
    element?: HTMLElement;
}; // FIXME: может быть и строкой

export class Block<T extends BlockProps> {
    eventBus: () => EventBus;
    props: T;
    _element: HTMLElement | Text = null;
    _node: BlockNode = null;
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
        const {
            tagName,
            props: { attributes = {} },
        } = this._meta;

        this._element = this._createElement({
            type: tagName,
            props: attributes,
            children: [],
        });
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _createElement(node: BlockNode): HTMLElement | Text {
        if (typeof node === 'string') {
            return document.createTextNode(node);
        }

        if (node.element) {
            return node.element;
        }

        const el = document.createElement(node.type);

        // assign html attrs to element
        this._setProps(el, node.props);
        this._addEventListeners(el, node.props);

        // recursively create els for children
        node.children.forEach((child) => {
            const childElement = child.element
                ? child.element
                : this._createElement(child);
            el.appendChild(childElement);
        });

        return el;
    }

    _setBooleanProp(el, propName, propValue) {
        if (propValue) {
            el.setAttribute(propName, propValue);
            el[propName] = true;
        } else {
            el[propName] = false;
        }
    }
    _removeBooleanProp(el, propName) {
        el.removeAttribute(propName);
        el[propName] = false;
    }

    _isEventProp(propName) {
        return /^on/.test(propName);
    }
    _extractEventName(propName) {
        return propName.slice(2).toLowerCase();
    }
    _addEventListeners(element, props) {
        Object.keys(props).forEach((propName) => {
            if (this._isEventProp(propName)) {
                element.addEventListener(
                    this._extractEventName(propName),
                    props[propName]
                );
            }
        });
    }

    // unknown or forse update
    _isCustomProp(propName) {
        return this._isEventProp(propName) || propName === 'forceUpdate';
    }

    // set/remove/update prop
    _removeProp(el, propName, propValue) {
        if (this._isCustomProp(propName)) {
            return;
        } else if (propName === 'className') {
            el.removeAttribute('class');
        } else if (typeof propValue === 'boolean') {
            this._removeBooleanProp(el, propName);
        } else {
            el.removeAttribute(propName);
        }
    }

    _setProp(el, propName, propValue) {
        if (this._isCustomProp(propName)) {
            return;
        } else if (propName === 'className') {
            el.setAttribute('class', propValue);
        } else if (typeof propValue === 'boolean') {
            this._setBooleanProp(el, propName, propValue);
        } else {
            el.setAttribute(propName, propValue);
        }
    }

    _updateProp(el, propName, newVal, oldVal) {
        if (!newVal) {
            this._removeProp(el, propName, oldVal);
        } else if (!oldVal || newVal !== oldVal) {
            this._setProp(el, propName, newVal);
        }
    }

    _setProps(el, props) {
        Object.keys(props).forEach((propName) => {
            this._setProp(el, propName, props[propName]);
        });
    }

    _updateProps(el, newProps, oldProps = {}) {
        const props = { ...newProps, ...oldProps };

        Object.keys(props).forEach((name) => {
            this._updateProp(el, name, newProps[name], oldProps[name]);
        });
    }

    _componentDidMount(oldProps) {
        this.componentDidMount(oldProps);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps) { }

    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }

        return response;
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
        return false;
    }

    setProps = (nextProps) => {
        if (!nextProps) {
            return;
        }

        const oldProps = { ...this.props }; // deepClone
        this.props = Object.assign(this.props, nextProps);
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
    };

    get element() {
        return this._element;
    }

    get node() {
        return this._node;
    }

    _differ(node1, node2) {
        return (
            typeof node1 !== typeof node2 ||
            (typeof node1 === 'string' && node1 !== node2) ||
            node1.type !== node2.type ||
            (node1.props && node1.props.forceUpdate)
        );
    }

    _updateElement(parentNode, newNode, oldNode, index = 0, realDomIndex = index) {
        // если внутри родителя нет ничего вообще и не нужно ничего вставлять
        if (newNode === null && oldNode === null) {
            return;
        }

        if (typeof oldNode === 'undefined' || oldNode === null) { // если в старом дереве не хватает ноды из нового
            parentNode.appendChild(this._createElement(newNode));
        } else if (typeof newNode === 'undefined' || newNode === null) {  // если в новом дереве нет ноды из старого
            // мы можем удалять больше одного потомка у родителя.
            // В этом случае индекс итерируемой виртуальной ноды будет больше кол-ва потомков родителя в реальном DOM-дереве
            // поэтому будем удалять последний, если по индексу удалить не выйдет
            const childToRemove = parentNode.childNodes[realDomIndex];

            if (childToRemove) {
                parentNode.removeChild(childToRemove);
                return realDomIndex - 1;
            }

        } else if (this._differ(newNode, oldNode)) { // оба есть, но нода изменилась
            parentNode.replaceChild(
                this._createElement(newNode),
                parentNode.childNodes[index]
            );
        } else if (newNode.type) { // ноды не отличаются
            // нужно обновить свойства ноды parentNode.childNodes[index]

            // FIXME: также не понимаю, почему иногда возникает ошибка, что родителя не существует
            this._updateProps(
                parentNode.childNodes[index],
                newNode.props,
                oldNode.props
            );

            // и перебрать потомков
            const longestChildrenLen = Math.max(
                newNode.children.length,
                oldNode.children.length
            );

            for (let i = 0; i < longestChildrenLen; i++) {
                // возникают проблемы при удалении: если старое виртуальное дерево больше нового, индекс итерации становится
                // больше реального размера DOM-дерева.
                // поэтому нужно аккуратно удалять только те ноды, которые нужно удалить.

                // FIXME: не могу отдебажить, почему не удаляются все ноды, но хотя бы приложение не падает в смерть))))

                let realDomIndex = undefined;

                let returned = this._updateElement(
                    parentNode.childNodes[index],
                    newNode.children[i],
                    oldNode.children[i],
                    i,
                    realDomIndex // нужен только для удаления!
                );

                realDomIndex = returned;
            }
        }
    }

    _render() {
        // процесс рендера возвращает виртуальное дерево элементов
        const newNode = this.render();

        // рендерим виртуальную ноду в элемент, сверяя старое и новое дерево, делая только необходимые замены в дом
        this._updateElement(this._element, newNode, this._node);

        // всегда храним виртуальную ноду для того, чтобы сравнивать её с новой
        this._node = newNode;
    }

    // Может переопределять пользователь, необязательно трогать
    render(): BlockNode {
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
            element: this.element,
        };
    }

    _makePropsProxy(props) {
        const self = this;

        const propsProxy = new Proxy(props, {
            set(target, prop, value) {
                const old = self.props[prop];
                target[prop] = value;

                if (old !== value) {
                    self.eventBus().emit(Block.EVENTS.FLOW_RENDER);
                }

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
        (this.getContent() as HTMLElement).style.display = 'flex'; // FIXME
    }

    hide() {
        (this.getContent() as HTMLElement).style.display = 'none'; // FIXME
    }
}
