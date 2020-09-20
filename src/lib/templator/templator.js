// черновик будущего шаблонизатора. Оказалось, на него нужно потратить побольше времени...
// апд. Расчехлила черновик, доработаю, так как для задач "виртуального дома" он подошёл лучше handlebars
// интуитивно получилось очень похоже на результат парсинга jsx бабель-плагином))

// идею взяла из https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060

import { Block } from '../Block.js';
import get from './getValueByKey.js';

const getOpeningTagName = (tag) => {
    const matchResult = tag.match(/<(\w+)[\s\w>]/);
    return matchResult ? matchResult[1] : null;
};

const getClosingTagName = (tag) => {
    const matchResult = tag.match(/<\/(.+?)>/);
    return matchResult ? matchResult[1] : null;
};

const isTag = (chunk) => {
    return /(<.+?>)/.test(chunk);
};
const isClosingTag = (chunk) => {
    return /(<\/(.+?)>)/.test(chunk);
};

const getTagAttributes = (tag) => {
    return tag
        .split(/[\s]/g)
        .slice(1)
        .reduce((acc, attribute) => {
            attribute = attribute.replace(/[>"]/g, '');
            const attrTuple = attribute.split('=');

            if (attrTuple.length === 1) {
                // атрибут без значения будем считать true
                attrTuple.push(true);
            }

            const [attrName, attrValue] = attrTuple;

            acc[attrName] = attrValue;

            return acc;
        }, {});
    // .map((attribute) => {
    //     attribute = attribute.replace(/[>"]/g, '');
    //     const attrTuple = attribute.split('=');

    //     if (attrTuple.length === 1) {
    //         // атрибут без значения будем считать true
    //         attrTuple.push(true);
    //     }

    //     // return attrTuple;
    // });
};

const htmlParser = (htmlStr, context) => {
    let elementsTree = {};

    const chunks = htmlStr
        .split(/(<.+?>)/gi)
        .map((v) => v.replace(/\n/g, '').trim())
        .filter((v) => v);

    const stack = [];
    for (let chunk of chunks) {
        if (isTag(chunk)) {
            if (isClosingTag(chunk)) {
                if (
                    getOpeningTagName(chunk) ===
                    getClosingTagName(stack[stack.length - 1])
                ) {
                    stack.pop();
                } else {
                    throw new Error(
                        `Template string is invalid. Current stack: ${stack}`
                    );
                }
            } else {
                if (stack.length) {
                    let currLevel = elementsTree;

                    for (let i = 1; i < stack.length; i++) {
                        let node = currLevel.children
                            .slice()
                            .reverse()
                            .find(
                                ({ type }) =>
                                    type === getOpeningTagName(stack[i])
                            );

                        currLevel = node;
                    }

                    const tagAttributes = getTagAttributes(chunk);
                    currLevel.children = [
                        ...(currLevel.children || []),
                        {
                            type: getOpeningTagName(chunk),
                            children: [],
                            props: tagAttributes,
                        },
                    ];
                } else {
                    const tagAttributes = getTagAttributes(chunk);

                    elementsTree = {
                        type: getOpeningTagName(chunk),
                        children: [],
                        props: tagAttributes,
                    };
                }

                stack.push(chunk);
            }
        } else {
            let currLevel = elementsTree;

            for (let i = 1; i < stack.length; i++) {
                let node = currLevel.children
                    .slice()
                    .reverse()
                    .find(({ type }) => type === getOpeningTagName(stack[i]));
                // написать find last
                currLevel = node;
            }

            const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
            let insertion = chunk;
            let key = null;

            while ((key = TEMPLATE_REGEXP.exec(chunk))) {
                const tmplValue = key[1].trim();
                const data = get(context, tmplValue);

                if (data instanceof Block) {
                    currLevel.children.push(data.getNode());
                    insertion = insertion.replace(new RegExp(key[0], 'gi'), '');
                } else {
                    insertion = insertion.replace(
                        new RegExp(key[0], 'gi'),
                        data
                    );
                }
            }

            currLevel.children.push(insertion);
        }
    }

    return elementsTree;
};

// helpers for props update

// boolean prop
const setBooleanProp = (el, propName, propValue) => {
    if (propValue) {
        el.setAttribute(propName, propValue);
        el[propName] = true;
    } else {
        el[propName] = false;
    }
};
const removeBooleanProp = (el, propName) => {
    el.removeAttribute(propName);
    el[propName] = false;
};

// event prop
// would be helpful for event listeners
function isEventProp(propName) {
    return /^on/.test(propName);
}

// unknown or forse update
const isCustomProp = (propName) => {
    return isEventProp(propName) || propName === 'forceUpdate';
};

// set/remove/update prop
function removeProp(el, propName, propValue) {
    if (isCustomProp(propName)) {
        return;
    } else if (propName === 'className') {
        el.removeAttribute('class');
    } else if (typeof propValue === 'boolean') {
        removeBooleanProp(el, propName);
    } else {
        el.removeAttribute(propName);
    }
}

function setProp(el, propName, propValue) {
    if (isCustomProp(propName)) {
        return;
    } else if (propName === 'className') {
        el.setAttribute('class', propValue);
    } else if (typeof propValue === 'boolean') {
        setBooleanProp(el, propName, propValue);
    } else {
        el.setAttribute(propName, propValue);
    }
}

const updateProp = (el, propName, newVal, oldVal) => {
    if (!newVal) {
        removeProp(el, propName, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
        setProp(el, propName, newVal);
    }
};

// set/update props for element
const setProps = (el, props) => {
    Object.keys(props).forEach((propName) => {
        setProp(el, propName, props[propName]);
    });
};

const updateProps = (el, newProps, oldProps = {}) => {
    const props = { ...newProps, ...oldProps };

    Object.keys(props).forEach((name) => {
        updateProp(el, name, newProps[name], oldProps[name]);
    });
};

// helper for real node creation
const createElement = (node) => {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }

    const el = document.createElement(node.type);

    // assign html attrs to element
    console.log(node);
    setProps(el, node.props);

    // recursively create els for children
    node.children.forEach((child) => {
        el.appendChild(createElement(child));
    });

    return el;
};

// Render
const hasChanged = (node1, node2) => {
    return (
        typeof node1 !== typeof node2 ||
        (typeof node1 === 'string' && node1 !== node2) ||
        node1.type !== node2.type
    );
};

export const render = (parentNode, newNode, oldNode, index = 0) => {
    if (!oldNode) {
        parentNode.appendChild(createElement(newNode));
    } else if (!newNode) {
        parentNode.removeChild(parentNode.childNodes[index]);
    } else if (hasChanged(newNode, oldNode)) {
        parentNode.replaceChild(
            createElement(newNode),
            parentNode.childNodes[index]
        );
    } else if (newNode.type) {
        updateProps(parentNode.childNodes[index], newNode.props, oldNode.props);

        for (
            let i = 0;
            i < newNode.children.length || i < oldNode.children.length;
            i++
        ) {
            render(
                parentNode.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            );
        }
    }
};

// const renderElement = (element) => {
//     console.log(createElement(element));
//     const domElement = document.createElement(element.type);

//     if (element.props.length) {
//         element.props.forEach(([name, value]) => {
//             domElement.setAttribute(name, value);
//         });
//     }

//     element.children.forEach((child) => {
//         if (typeof child === 'string') {
//             domElement.append(child);
//         } else {
//             const el = renderElement(child);

//             domElement.appendChild(el);
//         }
//     });

//     return domElement;
// };

export const compileTemplate = (template, context) =>
    htmlParser(template, context);
