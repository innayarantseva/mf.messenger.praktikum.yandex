import { renderTemplate } from '../../utils/renderTemplate.js';
import { errorTemplate } from './template.js';
import { error500 } from './500.js';

const CONTAINER_NAME = 'error';

const context = error500;
const layout = renderTemplate(errorTemplate, context);
const container = document.getElementsByClassName(CONTAINER_NAME)[0];

container.appendChild(layout);
document.title = context.title;
