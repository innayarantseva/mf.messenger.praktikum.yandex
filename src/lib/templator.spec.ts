import {
    getTagName,
    isTag,
    isClosingTag,
    getTemplateValue,
    getTagAttributes,
    createElementTreeNode,
    htmlParser
} from './templator';

describe('getting tag name', () => {
    test('name extracts from opening tag', () => {
        expect(getTagName('<div>')).toBe('div');
    });
    test('name extracts from closing tag', () => {
        expect(getTagName('</div>')).toBe('div');
    });
    test('name extracts from tag with attributes', () => {
        expect(getTagName('<div class="class-name">')).toBe('div');
        expect(getTagName('<div class="class-name another-class">')).toBe('div');
        expect(getTagName('<div class="class-name" data-some-data="value">')).toBe('div');
    });
});

describe('checking if text chunk is a tag', () => {
    test('chunk with a tag is truthy', () => {
        expect(isTag('<div>')).toBeTruthy();
        expect(isTag('</div>')).toBeTruthy();
    });
    test('chunk with a tag and attributes is truthy', () => {
        expect(isTag('<div class="class-name" style="opacity: 0.5">')).toBeTruthy();
    });
    test('chunk without a tag is falsy', () => {
        expect(isTag('div')).toBeFalsy();
        expect(isTag('</div')).toBeFalsy();
        expect(isTag('<')).toBeFalsy();
    });
});

describe('checking if chunk is a closing tag', () => {
    test('chunk with a closing tag is truthy', () => {
        expect(isClosingTag('</div>')).toBeTruthy();
    });
    test('chunk with an opening tag is falsy', () => {
        expect(isClosingTag('<div>')).toBeFalsy();
    });
    test('chunk without a tag is falsy', () => {
        expect(isClosingTag('div')).toBeFalsy();
        expect(isClosingTag('</div')).toBeFalsy();
        expect(isClosingTag('<')).toBeFalsy();
    });
});

describe('getting template value', () => {
    test('double curly braces replaces with value from context', () => {
        expect(getTemplateValue('{{value}}', { value: 'I am compiled!' })).toBe('I am compiled!');
        expect(getTemplateValue('{{ value }}', { value: 'I am compiled!' })).toBe('I am compiled!');
        expect(getTemplateValue('{{value.level}}', { value: { level: 'I am compiled!' } })).toBe('I am compiled!');
    });

    test('two consequent double curly braces replaces with value from context', () => {
        expect(getTemplateValue('{{value}}, {{anotherValue}}', { value: 'one', anotherValue: 'two' })).toBe('one, two');
    });

    test('double curly braces inside tags replaces with value from context', () => {
        expect(getTemplateValue('<div>{{value}}</div>', { value: 'I am compiled!' })).toBe('<div>I am compiled!</div>');
    });

    test('double curly braces inside attribute replaces with value from context', () => {
        expect(getTemplateValue('<div class="{{value}}">block</div>', { value: 'class-name' })).toBe('<div class="class-name">block</div>');
    });
});

describe('getting tag attributes object', () => {
    test('get a defined attribute', () => {
        expect(getTagAttributes('<div class="my-class">', {})).toEqual({ class: 'my-class' });
        expect(getTagAttributes('<div data-field-name="my-field">', {})).toEqual({ 'data-field-name': 'my-field' });
    });
    test('get an attribute from template value', () => {
        expect(
            getTagAttributes('<div class="my-class__{{element}}">', { element: 'my-element' })
        ).toEqual({ class: 'my-class__my-element' });
    });
    test('get several class values from class attribute', () => {
        expect(
            getTagAttributes('<div class="my-class my-another-class my-third-class">', {})
        ).toEqual({ class: 'my-class my-another-class my-third-class' });
    });
});

describe('creating a node from text chunk', () => {
    test('get a node without attributes', () => {
        expect(createElementTreeNode('<div>', {})).toEqual({ type: 'div', children: [], props: {} });
    });
    test('get a node with attributes', () => {
        expect(
            createElementTreeNode('<div class="my-node" onclick="alert(\'hello!\')">', {})
        ).toEqual(
            {
                type: 'div',
                children: [],
                props: {
                    class: 'my-node',
                    onclick: 'alert(\'hello!\')'
                }
            }
        );
    });
});

describe('getting a virtual DOM tree from a template string', () => {
    test('get a virtual DOM tree', () => {
        expect(
            htmlParser(
                '<div class="my-node"><a href="{{href}}" class="link custom-link">Home</a><h1>{{header}}</h1></div>',
                { header: 'Main Page', href: '/back' }
            )
        ).toEqual(
            {
                type: 'div',
                children: [
                    {
                        type: 'a',
                        children: ['Home'],
                        props: {
                            class: 'link custom-link',
                            href: '/back'
                        }
                    },
                    {
                        type: 'h1',
                        children: ['Main Page'],
                        props: {}
                    }
                ],
                props: {
                    class: 'my-node'
                }
            }
        );
    });
});