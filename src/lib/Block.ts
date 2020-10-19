import { EventBus } from './EventBus';
import { cloneDeep } from '../utils/mydash/deepClone';


export type BlockProps = object;

export type BlockNodeProps = Record<string, string | number | boolean | object | Function>;
export type BlockNode = {
    type: string;
    props: BlockNodeProps;
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
        FLOW_RENDER: 'flow:render'
    };

    constructor(tagName = 'div', props: T) {
        const eventBus = new EventBus();

        this._meta = {
            tagName,
            props
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

    /** Creates actual DOM element. */
    _createResources() {
        const {
            tagName,
            props: { attributes = {} }
        } = this._meta;

        this._element = this._createElement({
            type: tagName,
            props: attributes,
            children: []
        });
    }

    /** Creates actual DOM element and inits first render. */
    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    /** Creates or extracts an Element. */
    _createElement(node: BlockNode | string): HTMLElement | Text {
        // it's a text node
        if (typeof node === 'string') {
            return document.createTextNode(node);
        }

        // element already exists
        if (node.element) {
            return node.element;
        }

        // if not, create a new one
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

    /** Sets a boolean prop on given element. */
    _setBooleanProp(el: HTMLElement, propName: string, propValue: boolean): void {
        if (propValue) {
            el.setAttribute(propName, '');
            el[propName] = true;
        } else {
            el[propName] = false;
        }
    }
    /** Remove a boolean prop on given element. */
    _removeBooleanProp(el: HTMLElement, propName: string): void {
        el.removeAttribute(propName);
        el[propName] = false;
    }

    /** Tests whether a prop name is an event name. */
    _isEventProp(propName: string): boolean {
        return /^on/.test(propName);
    }
    /** Extracts event name for defining event listener. */
    _extractEventName(propName: string): string {
        return propName.slice(2).toLowerCase();
    }
    /** Adds event listener to element. */
    _addEventListeners(element: HTMLElement, props): void {
        Object.keys(props).forEach((propName) => {
            if (this._isEventProp(propName)) {
                element.addEventListener(
                    this._extractEventName(propName),
                    props[propName]
                );
            }
        });
    }

    /** Checks whether a prop is custom,
     * which is for now means if it is an event listener or 'forceUpdate'.
     */
    _isCustomProp(propName: string): boolean {
        return this._isEventProp(propName) || propName === 'forceUpdate';
    }


    /** Removes a prop from given element. */
    _removeProp(el: HTMLElement, propName: string, propValue: string | boolean): void {
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

    /** Sets a prop on given element. */
    _setProp(el: HTMLElement, propName: string, propValue: string | boolean) {
        if (this._isCustomProp(propName)) {
            return;
        } else if (propName === 'className') {
            el.setAttribute('class', propValue.toString());
        } else if (typeof propValue === 'boolean') {
            this._setBooleanProp(el, propName, propValue);
        } else {
            el.setAttribute(propName, propValue);
        }
    }

    _updateProp(el, propName, newVal, oldVal) {
        if (!newVal) {
            this._removeProp(el, propName, oldVal);
            // } else if (!oldVal || newVal !== oldVal) { // быстрый костыль, не оч хороший по производительности
        } else if (!oldVal || newVal) {
            this._setProp(el, propName, newVal);
        }
    }

    _setProps(el, props) {
        Object.keys(props).forEach((propName) => {
            this._setProp(el, propName, props[propName]);
        });
    }

    _updateProps(el, newProps, oldProps = {}) {
        const props = Object.assign(oldProps, newProps);

        Object.keys(props).forEach((name) => {
            this._updateProp(el, name, newProps[name], oldProps[name]);
        });
    }

    _componentDidMount(oldProps) {
        this.componentDidMount(oldProps);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps) { }

    _componentDidUpdate(oldProps, newProps, oldNode) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER, oldNode);
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

        const oldProps = cloneDeep(this.props); // deepClone
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

    _updateElement(parentNode, newNode, oldNode, index = 0, insertBefore = null) {
        // если внутри родителя нет ничего вообще и не нужно ничего вставлять
        if ((newNode === null || typeof newNode === 'undefined') && (oldNode === null || typeof oldNode === 'undefined')) {
            return;
        }

        if (typeof oldNode === 'undefined' || oldNode === null) { // если в старом дереве не хватает ноды из нового
            const newElement = this._createElement(newNode);

            if (insertBefore) {
                parentNode.insertBefore(newElement, parentNode.childNodes[insertBefore]);
                // продолжаем добавлять новые ноды по индексу после последней реально существующей ноды
                return insertBefore;
            } else {
                parentNode.appendChild(newElement);
                // добавляем в конец списка — в реальном дереве уже могут быть потомки
                // все последующие ноды добавляем на это место, "вытесняя" предыдущие
                return parentNode.childNodes.length - 1;
            }
        } else if (typeof newNode === 'undefined' || newNode === null) {  // если в новом дереве нет ноды из старого
            const childToRemove = parentNode.childNodes[index];

            if (childToRemove) {
                parentNode.removeChild(childToRemove);
            }
        } else if (this._differ(newNode, oldNode)) { // оба есть, но нода изменилась
            parentNode.replaceChild(
                this._createElement(newNode),
                parentNode.childNodes[index]
            );
        } else if (newNode.type) { // ноды не отличаются
            // нужно обновить свойства ноды parentNode.childNodes[index]
            // плохо обновляются свойства

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

            let insertBefore = null;
            for (let i = longestChildrenLen - 1; i >= 0; i--) {
                // возникают проблемы при удалении: если старое виртуальное дерево больше нового, индекс итерации становится
                // больше реального размера DOM-дерева.
                // поэтому начнём удалять с конца списка

                // с добавлением придётся тоже обновить логику, так как изначально добавление шло в конец массива потомков
                insertBefore = this._updateElement(
                    parentNode.childNodes[index],
                    newNode.children[i],
                    oldNode.children[i],
                    i,
                    insertBefore
                );


            }
        }
    }

    _render() {
        // процесс рендера возвращает виртуальное дерево элементов
        const newNode = this.render();

        // рендерим виртуальную ноду в элемент, сверяя старое и новое дерево, делая только необходимые замены в дом

        // почему-то в старом дереве передаются свойства нод нового дерева, вроде имён классов
        // хотя структура старого дерева остаётся старой
        // из-за этого неправильно происходит апдейт элементов, так как новый класс всегда равен старому
        // это странно
        this._updateElement(this._element, newNode, this._node);

        // всегда храним виртуальную ноду для того, чтобы сравнивать её с новой
        if (!this._node) {
            // первый рендер компонента
            this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
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
            props: (this.props as { attributes }).attributes, // FIXME: для props прописать нормально тип
            children: [this.node],
            element: this.element
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
            }
        });

        return propsProxy;
    }

    show() {
        (this.getContent() as HTMLElement).style.display = 'flex'; // FIXME
    }

    hide() {
        (this.getContent() as HTMLElement).style.display = 'none'; // FIXME
    }
}
