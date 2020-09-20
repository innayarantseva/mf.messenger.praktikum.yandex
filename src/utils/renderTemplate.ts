declare var Handlebars: any;

export const renderTemplate = (
    templateString: string,
    context: object
): HTMLElement => {
    const template = Handlebars.compile(templateString);
    const htmlString = template(context);

    // the following idea is from https://gomakethings.com/converting-a-string-into-markup-with-vanilla-js/

    const isParserSupported = (function () {
        if (!window.DOMParser) return false;

        try {
            new DOMParser().parseFromString('test', 'text/html');
        } catch (error) {
            return false;
        }

        return true;
    })();

    let element: HTMLElement = null;

    if (isParserSupported) {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        element = <HTMLElement>doc.body.children.item(0);
    } else {
        const div = document.createElement('div');
        div.innerHTML = htmlString;
        element = div;
    }

    return element;
};
