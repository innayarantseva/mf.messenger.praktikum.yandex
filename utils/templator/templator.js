// черновик будущего шаблонизатора. Оказалось, на него нужно потратить побольше времени...

import get from './getValueByKey.js';

const getOpeningTagName = (tag) => {
    const matchResult = tag.match(/<(\w+)[\s\w>]/);
    return matchResult ? matchResult[1] : null;
}

const getClosingTagName = (tag) => {
    const matchResult = tag.match(/<\/(.+?)>/);
    return matchResult ? matchResult[1] : null;
}

const isTag = (chunk) => {
    return /(<.+?>)/.test(chunk);
}
const isClosingTag = (chunk) => {
    return /(<\/(.+?)>)/.test(chunk);
}

const getTagAttributes = (tag) => {
    return tag.split(/[\s]/g).slice(1).map((attribute) => {
        attribute = attribute.replace(/[>"]/g, '');
        const attrTuple = attribute.split('=');

        if (attrTuple.length === 1) { // атрибут без значения будем считать true
            attrTuple.push(true);
        }

        return attrTuple;
    });
}

const htmlParser = (htmlStr, context) => {
    let tree = {};

    const chunks = htmlStr.split(/(<.+?>)/gi).map((v) => v.replace(/\n/g, '').trim()).filter((v) => v);


    const stack = [];
    for (let chunk of chunks) {
        if (isTag(chunk)) {
            if (isClosingTag(chunk)) {
                if (getOpeningTagName(chunk) === getClosingTagName(stack[stack.length - 1])) {
                    stack.pop();
                } else {
                    throw new Error(`Template string is invalid. Current stack: ${stack}`);
                }
            } else {
                if (stack.length) {
                    let currLevel = tree;

                    for (let i = 1; i < stack.length; i++) {
                        let node = currLevel.content.slice().reverse().find(({tagName}) => tagName === getOpeningTagName(stack[i]));

                        currLevel = node;

                    }

                    const tagAttributes = getTagAttributes(chunk);
                    currLevel.content = [...(currLevel.content || []), { tagName: getOpeningTagName(chunk), content: [], attrs: tagAttributes }];
                } else {
                    const tagAttributes = getTagAttributes(chunk);

                    tree = { tagName: getOpeningTagName(chunk), content: [], attrs: tagAttributes };
                }

                stack.push(chunk);
            }
        } else {
            let currLevel = tree;

            for (let i = 1; i < stack.length; i++) {
                let node = currLevel.content.slice().reverse().find(({tagName}) => tagName === getOpeningTagName(stack[i]));
                // написать find last
                currLevel = node;

            }

            const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
            let insertion = chunk;
            let key = null;


            while (key = TEMPLATE_REGEXP.exec(chunk)) {
                const tmplValue = key[1].trim();
                const data = get(context, tmplValue);

                insertion = insertion.replace(new RegExp(key[0], 'gi'), data);
            }

            currLevel.content.push(insertion);
        }
    }

    return tree;
};

const renderElement = (element) => {
    const domElement = document.createElement(element.tagName);

    if (element.attrs.length) {
        element.attrs.forEach(([name, value]) => {
            domElement.setAttribute(name, value);
        });
    }

    element.content.forEach((child) => {
        if (typeof child === 'string') {
            domElement.append(child);
        } else {
            const el = renderElement(child);

            domElement.appendChild(el);
        }
    })

    return domElement;
};

const renderTemplate = (template, context) => renderElement(htmlParser(template, context));


export default renderTemplate;