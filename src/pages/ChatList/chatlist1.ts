import { Chats } from './chatlist.js';
import { conversations } from './data.js';

export const page = new Chats(conversations['Соня Соня']);

// function renderToDom(query, block) {
//     const root = document.querySelector(query);
//     root.appendChild(block.getContent());
//     return root;
// }

// renderToDom('.app', page);
