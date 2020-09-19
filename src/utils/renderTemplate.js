export const renderTemplate = (templateString, context) => {
    const template = Handlebars.compile(templateString);
    const htmlString = template(context);

    // the following idea is from https://gomakethings.com/converting-a-string-into-markup-with-vanilla-js/

    const isParserSupported = (function () {
        if (!window.DOMParser) return false;

        try {
            new DOMParser().parseFromString('test', 'text/html');
        } catch(error) {
            return false;
        }

        return true;
    })();

    const fragment = document.createDocumentFragment();

    if (isParserSupported) {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');

        for (let i = 0; i < doc.body.children.length; i++) {
            fragment.appendChild(doc.body.children[i]);
        }
    } else {
        fragment.innerHTML = htmlString;
    }

    return fragment;
};