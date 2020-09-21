import { renderTemplate } from '../../utils/renderTemplate.js';
import { chatsTemplate } from './template.js';
import { chatTemplate } from './ChatListItem/template.js';
import { conversationTemplate } from './Conversation/template.js';
import { messageTemplate } from './Message/template.js';
import { chatList, converstions } from './data.js';

// interactive elements selectors
const CONTAINER_CLASS_SELECTOR = 'chats';

const CHATS_LIST_CLASS_SELECTOR = 'chats__list';
const CHAT_SELECTOR = '.chats-list-item';

const CHAT_OPTIONS_CLASS_SELECTOR = 'conversation__options';
const CHAT_OPTIONS_MENU_CLASS_SELECTOR = 'conversation__options-menu';
const CHAT_OPTIONS_MENU_OPENED_CLASS_SELECTOR =
    'conversation__options-menu_opened_true';

const CHAT_ATTACHEMENT_CLASS_SELECTOR = 'conversation__attachment';
const CHAT_ATTACHEMENT_MENU_CLASS_SELECTOR = 'conversation__attachment-menu';
const CHAT_ATTACHEMENT_MENU_OPENED_CLASS_SELECTOR =
    'conversation__attachment-menu_opened_true';

// заглушка на время
declare var Handlebars: any;

// compile and register template for Chat as Handlebars partials
const Chat = Handlebars.compile(chatTemplate);
const Conversation = Handlebars.compile(conversationTemplate);
const Message = Handlebars.compile(messageTemplate);
Handlebars.registerPartial({ Chat, Conversation, Message });

// toggle auth context: from register to sign in and back
const renderByContext = (context) => {
    const layout = renderTemplate(chatsTemplate, context);
    const container = document.getElementsByClassName(
        CONTAINER_CLASS_SELECTOR
    )[0];

    container.innerHTML = '';
    container.appendChild(layout);
    document.title = context.title;

    // handle chat click
    const chatsList = document.getElementsByClassName(
        CHATS_LIST_CLASS_SELECTOR
    )[0];

    chatsList.addEventListener('click', (event) => {
        const closestChatItemParent = (event.target as HTMLElement).closest(
            CHAT_SELECTOR
        );

        if (closestChatItemParent) {
            const chatTitle = (closestChatItemParent as HTMLElement).dataset
                .chatTitle;
            const newContext = {
                ...context,
                title: chatTitle,
                conversation: converstions[chatTitle],
            };
            renderByContext(newContext);
        }
    });

    // handle menu buttons clicks
    const chatOptions = document.getElementsByClassName(
        CHAT_OPTIONS_CLASS_SELECTOR
    )[0];
    if (chatOptions) {
        chatOptions.addEventListener('click', () => {
            const chatOptionsMenu = chatOptions.getElementsByClassName(
                CHAT_OPTIONS_MENU_CLASS_SELECTOR
            )[0];
            chatOptionsMenu.classList.toggle(
                CHAT_OPTIONS_MENU_OPENED_CLASS_SELECTOR
            );
        });
    }

    const chatAttachment = document.getElementsByClassName(
        CHAT_ATTACHEMENT_CLASS_SELECTOR
    )[0];
    if (chatAttachment) {
        chatAttachment.addEventListener('click', () => {
            const chatAttachmentMenu = chatAttachment.getElementsByClassName(
                CHAT_ATTACHEMENT_MENU_CLASS_SELECTOR
            )[0];
            chatAttachmentMenu.classList.toggle(
                CHAT_ATTACHEMENT_MENU_OPENED_CLASS_SELECTOR
            );
        });
    }
};

renderByContext(chatList);
