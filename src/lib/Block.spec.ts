import { Block, BlockNode } from './Block';

const blockInstanceProps = {
    attributes: { className: 'my-class' },
    prop: 'propValue'
};
const blockInstance = new Block('div', blockInstanceProps);

// базовые функции создания и обновления элемента
describe('should create text and regular elements', () => {
    test('creates text node from text', () => {
        expect(blockInstance._createElement('my text')).toBeInstanceOf(Text);
    });

    test('returns element if node already has it rendered', () => {
        const element = document.createElement('div');
        element.setAttribute('class', 'my-class');

        const node: BlockNode = {
            type: 'div',
            props: blockInstanceProps,
            children: [],
            element
        };
        expect(blockInstance._createElement(node)).toBe(element);
    });

    test('creates new Element if not already rendered', () => {
        const node: BlockNode = {
            type: 'div',
            props: blockInstanceProps,
            children: []
        };
        expect(blockInstance._createElement(node)).toBeInstanceOf(Element);
    });

    test.todo('recursively create elements for children');
});

describe('should correctly set boolean props on given element', () => {
    test('sets truthy attribute', () => {
        const element = document.createElement('button');
        blockInstance._setBooleanProp(element, 'disabled', true);

        expect(element.getAttribute('disabled')).toBe('');
    });

    test('sets falsy attribute', () => {
        const element = document.createElement('button');
        blockInstance._setBooleanProp(element, 'disabled', false);

        expect(element.getAttribute('disabled')).toBeNull();
    });
});

describe('should correctly remove boolean props on given element', () => {
    test('remove truthy attribute', () => {
        const element = document.createElement('button');
        element.setAttribute('disabled', '');
        blockInstance._removeBooleanProp(element, 'disabled');

        expect(element.getAttribute('disabled')).toBeNull();
    });
});

describe('check if prop is an evemt listener or meant to force update element', () => {
    test('event listeners are custom props', () => {
        expect(blockInstance._isCustomProp('onClick')).toBeTruthy();
        expect(blockInstance._isCustomProp('onblur')).toBeTruthy();
    });

    test('forceUpdate custom props', () => {
        expect(blockInstance._isCustomProp('forceUpdate')).toBeTruthy();
    });
});

describe('isEventProp should return truth when a property is an event', () => {
    test('defines event properties to be truthy', () => {
        expect(blockInstance._isEventProp('onClick')).toBeTruthy();
        expect(blockInstance._isEventProp('onFocus')).toBeTruthy();
        expect(blockInstance._isEventProp('onblur')).toBeTruthy();
    });

    test('defines className property name not to be an event listener prop', () => {
        expect(blockInstance._isEventProp('className')).toBeFalsy();
    });
});

describe('extractEventName should return an event name', () => {
    test('return event name', () => {
        expect(blockInstance._extractEventName('onClick')).toBe('click');
        expect(blockInstance._extractEventName('onFocus')).toBe('focus');
        expect(blockInstance._extractEventName('onblur')).toBe('blur');
    });
});

describe('addEventListeners should add event listeners to element', () => {
    test.todo('add event listener');
});

describe('should remove a prop', () => {
    test('shouldnt remove custom prop', () => {
        const element = document.createElement('button');
        const [propName, propValue] = ['onclick', 'alert()'];
        element.setAttribute(propName, propValue);

        blockInstance._removeProp(element, propName, propValue);

        expect(element.getAttribute(propName)).toBe(propValue);
    });

    test('remove className prop as class', () => {
        const element = document.createElement('button');
        const [propName, propValue] = ['class', 'my-class'];
        element.setAttribute(propName, propValue);

        blockInstance._removeProp(element, 'className', propValue);

        expect(element.getAttribute(propName)).toBeNull();
    });

    test('remove boolean prop', () => {
        const element = document.createElement('button');
        const [propName, propValue] = ['disabled', ''];
        element.setAttribute(propName, propValue);

        blockInstance._removeProp(element, propName, false);

        expect(element.getAttribute(propName)).toBeNull();
    });

    test('remove any other prop', () => {
        const element = document.createElement('button');
        const [propName, propValue] = ['data-test-attribute', 'my-data'];
        element.setAttribute(propName, propValue);

        blockInstance._removeProp(element, propName, propValue);

        expect(element.getAttribute(propName)).toBeNull();
    });
});

// переходы по жизненному циклу
describe('Block lifecycle', () => {
    test('fires render and componentDidMount after init', () => {
        const spyOnLCEvents = jest.spyOn(blockInstance.eventBus(), 'emit');

        blockInstance.init();

        expect(spyOnLCEvents).toHaveBeenCalledWith(Block.EVENTS.FLOW_RENDER);
        expect(spyOnLCEvents).toHaveBeenCalledWith(Block.EVENTS.FLOW_CDM);
    });

    // не совсем разобралась со шпионом, продолжаю эксперименты :)
    // test('fires an update event after setting new props', () => {
    //     const spyOnLC = jest.spyOn(blockInstance.eventBus(), 'emit');

    //     const oldProps = cloneDeep(blockInstance.props);
    //     const incomingProps = { prop: 'newPropValue' };
    //     const newProps = Object.assign(blockInstance.props, incomingProps);

    //     blockInstance.setProps(incomingProps);

    //     expect(spyOnLC).toHaveBeenCalledWith(Block.EVENTS.FLOW_RENDER); // перерендер после обновления свойства
    //     expect(spyOnLC).toHaveBeenCalledWith(Block.EVENTS.FLOW_CDU, oldProps, newProps);
    // })
});
