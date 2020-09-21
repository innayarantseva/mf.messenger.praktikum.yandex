// черновик будущего шаблонизатора. Оказалось, на него нужно потратить побольше времени...
// апд. Расчехлила черновик, доработаю, так как для задач "виртуального дома" он подошёл лучше handlebars
// интуитивно получилось очень похоже на результат парсинга jsx бабель-плагином))

// идею взяла из https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060

import { Block, BlockNode } from './Block.js';
import get from '../utils/mydash/getValueByKey.js'; // FIXME: исправить импорты на именованные
import last from '../utils/mydash/last.js';

const SELF_CLOSING_TAGS = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
];

const getTagName = (tag) => {
    const matchResult = tag.match(/<\/?(\w+)[\s\w>]/);
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
};

const createElementTreeNode = (chunk) => {
    const tagAttributes = getTagAttributes(chunk);
    return {
        type: getTagName(chunk),
        children: [],
        props: tagAttributes,
    };
};

// type ElementsTree = {
//     type: string;
//     props: Record<string, string | number | boolean | Function>;
//     children: ElementsTree[];
// };

const htmlParser = (htmlStr, context: object): BlockNode => {
    // функции-хелперы для работы с деревом: поиск текущего уровня и вставка новой ноды
    const getCurrentTreeLevel = () => {
        let currLevel = elementsTree;

        for (let i = 1; i < stack.length; i++) {
            let node = currLevel.children
                .slice()
                .reverse()
                .find(({ type }) => type === getTagName(stack[i]));

            currLevel = node;
        }

        return currLevel;
    };

    const appendNodeToTree = (chunk) => {
        const node = createElementTreeNode(chunk);

        if (stack.length) {
            const currLevel = getCurrentTreeLevel();
            currLevel.children = [...(currLevel.children || []), node];
        } else {
            elementsTree = node;
        }
    };

    const chunks = htmlStr
        .split(/(<.+?>)/gi)
        .map((v) => v.replace(/\n/g, '').trim())
        .filter((v) => v);

    let elementsTree: BlockNode = null;
    const stack = [];

    for (let chunk of chunks) {
        if (isTag(chunk)) {
            if (isClosingTag(chunk)) {
                if (SELF_CLOSING_TAGS.includes(getTagName(chunk))) {
                    appendNodeToTree(chunk);
                } else if (getTagName(chunk) === getTagName(last(stack))) {
                    stack.pop();
                } else {
                    throw new Error(
                        `Template string is invalid. Current stack: ${stack}`
                    );
                }
            } else {
                appendNodeToTree(chunk);

                if (!SELF_CLOSING_TAGS.includes(getTagName(chunk))) {
                    stack.push(chunk);
                }
            }
        } else {
            const currLevel = getCurrentTreeLevel();

            const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
            let insertion = chunk;
            let key = null;

            while ((key = TEMPLATE_REGEXP.exec(chunk))) {
                const tmplValue = key[1].trim();
                const data = get(context, tmplValue);

                if (data instanceof Block) {
                    currLevel.children.push(data.getNode() as BlockNode); // FIXME
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

export const compileTemplate = (template: string, context: object): BlockNode =>
    htmlParser(template, context);
