// черновик будущего шаблонизатора. Оказалось, на него нужно потратить побольше времени...
// апд. Расчехлила черновик, доработаю, так как для задач "виртуального дома" он подошёл лучше handlebars
// интуитивно получилось очень похоже на результат парсинга jsx бабель-плагином))

// идею взяла из https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060

import { Block, BlockNode, BlockNodeProps } from './Block';
import { get } from '../utils/mydash/getValueByKey';
import last from '../utils/mydash/last'; // FIXME: исправить импорты на именованные

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

/** Return given tag's name. */
export const getTagName = (tag: string): string => {
    const matchResult = tag.match(/<\/?(\w+)[\s\w>]/);
    return matchResult ? matchResult[1] : null;
};

/** Check whether a text chunk is a tag. */
export const isTag = (chunk: string): boolean => {
    return /(<.+?>)/.test(chunk);
};
/** Check whether a text chunk is a closing tag. */
export const isClosingTag = (chunk: string): boolean => {
    return /(<\/(.+?)>)/.test(chunk);
};

/**
 * Return a string, compiled from a template string using provided context.
 * @param {string} chunk - A template string.
 * @param {Object} context - Context provided to compile a template.
 * @returns {string} — A compiled template string.
 */
export const getTemplateValue = (chunk, context: object) => {
    // FIXME: потом допишу типы когда сделаю тип BlockNode нормально
    // тогда получится сделать ф-ию универсальной для тегов и атрибутов
    const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
    let insertion = chunk;
    let key = null;

    while ((key = TEMPLATE_REGEXP.exec(chunk))) {
        const tmplValue = key[1].trim();
        const data = get(context, tmplValue);

        insertion = insertion.replace(new RegExp(key[0], 'gi'), data);
    }

    return insertion;
};

/**
 * Create a key-value representation of attributes used in given tag.
 * @param {string} tag - Tag to get trribute values from.
 * @param {Object} context - Context provided to compile a template.
 * @returns {Object} — Key-value pairs object represented attributes key-value pairs.
 */
export const getTagAttributes = (tag: string, context: object): BlockNodeProps => {
    let isClass = false;

    return tag
        .split(/[\s]/g)
        .slice(1)
        .reduce<BlockNodeProps>((acc, attribute) => {
            const srcStr = attribute;
            attribute = attribute.replace(/[>"]/g, '');
            const attrTuple = attribute.split('=') as [string, (string | boolean)?];

            if (attrTuple.length === 1) {
                // может быть это класс из атрибута
                if (isClass) {
                    acc.class =
                        acc.class +
                        ' ' +
                        getTemplateValue(attrTuple[0], context);

                    if (srcStr.endsWith('"') || srcStr.endsWith('>')) {
                        isClass = false;
                    }
                }
                // атрибут без значения будем считать true
                attrTuple.push(true);
            } else {
                const [attrName, attrValue] = attrTuple;

                acc[attrName] = getTemplateValue(attrValue, context);

                // если строка не закончилась, следующий одиночный чанк может быть значением класса тоже
                // FIXME: расширить до любого атрибута, в значении которого могут быть пробелы
                // или написать норм парсер уже
                if (srcStr.startsWith('class') && !srcStr.endsWith('"')) {
                    isClass = true;
                }
            }

            return acc;
        }, {});
};

/**
 * Create a virtual DOM tree node.
 * @param {string} chunk - Chunk to create a node from.
 * @param {Object} context - Context provided to compile a template.
 * @returns {Object} — A virtual DOM node tree (BlockNode type).
 */
export const createElementTreeNode = (chunk: string, context: object): BlockNode => {
    const tagAttributes = getTagAttributes(chunk, context);

    return {
        type: getTagName(chunk),
        children: [],
        props: tagAttributes,
    };
};

export const htmlParser = (htmlStr, context: object): BlockNode => {
    // функции-хелперы для работы с деревом: поиск текущего уровня и вставка новой ноды
    const getCurrentTreeLevel = () => {
        let currLevel = elementsTree;

        for (let i = 1; i < stack.length; i++) {
            const node = currLevel.children
                .slice()
                .reverse()
                .find(({ type }) => type === getTagName(stack[i]));

            currLevel = node;
        }

        return currLevel;
    };

    const appendNodeToTree = (chunk) => {
        const node = createElementTreeNode(chunk, context);

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

    for (const chunk of chunks) {
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
            // если шаблон состоит из пустой строки или текстовой ноды
            if (chunks.length === 1) {
                return getTemplateValue(chunk, context);
            }

            const currLevel = getCurrentTreeLevel();

            const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
            let insertion = chunk;
            let key = null;

            while ((key = TEMPLATE_REGEXP.exec(chunk))) {
                const tmplValue = key[1].trim();
                const data = get(context, tmplValue);

                if (
                    Array.isArray(data) &&
                    data.every((item) => item instanceof Block)
                ) {
                    currLevel.children = [
                        ...currLevel.children,
                        ...data.map((item) => item.getNode()),
                    ]; // FIXME
                    insertion = insertion.replace(new RegExp(key[0], 'gi'), '');
                }
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

            if (insertion !== '') {
                currLevel.children.push(insertion);
            }
        }
    }

    return elementsTree;
};

export const compileTemplate = (template: string, context: object): BlockNode =>
    htmlParser(template, context);
