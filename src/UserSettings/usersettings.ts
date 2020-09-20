// протестировала свою реализацию блока на этой странице

import { Button } from '../components/Button/index.js';
import { Block, BlockProps } from '../lib/Block.js';
import { userSettingsTemplate } from './template.js';
import { data } from './data.js';
import { compileTemplate } from '../lib/templator/templator.js';

type UserSettingsProps = BlockProps & {
    name: string;
    displayName: string;
    email: string;
    login: string;
    title: string;
    button: Button;
};

export class UserProfile extends Block<UserSettingsProps> {
    constructor() {
        super('div', {
            classNames: ['user-settings'],
            name: data.userData.name,
            displayName: data.userData.displayName,
            email: data.userData.email,
            login: data.userData.login,
            title: data.title,
            button: new Button({
                text: 'Изменить данные',
                classNames: ['user-settings__change-data'],
            }),
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.setProps({
                name: 'Login 3',
            });
        }, 10000);

        setTimeout(() => {
            this.props.button.setProps({
                text: 'changed text',
            });
            // нужно триггерить апдейт всего компонента, когда меняются свойста потомка...
            // пока не понимаю, почему так происходит
            this.setProps({
                button: this.props.button,
            });
        }, 15000);
    }

    render() {
        return <{ type: string; props: []; children: [] }>(
            compileTemplate(userSettingsTemplate, this.props)
        );
    }
}

const userProfile = new UserProfile();

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

render('.app', userProfile);

// import {renderTemplate} from '../utils/renderTemplate.js';
// import {userSettingsTemplate} from './template.js';
// import {registerFormPartial} from '../components/Form/registerForm.js';
// import {handleFormInteractions} from '../components/Form/handleFormInteractions.js'
// import {data} from './data.js';

// const CONTAINER_CLASS_SELECTOR = 'user-settings';
// const CHANGE_DATA_CLASS_SELECTOR = 'user-settings__change-data';
// const CANCEL_DATA_CHANGE_CLASS_SELECTOR = 'user-settings__cancel-data-change';

// let formData = data.form.formfields.reduce((acc, {field, value}) => {
//     acc[field] = value;
//     return acc;
// }, {});

// // register Form partial for using in auth template
// registerFormPartial();

// // toggle auth context: from register to sign in and back
// const renderByContext = (context) => {
//     const layout = renderTemplate(userSettingsTemplate, context);
//     const container = document.getElementsByClassName(CONTAINER_CLASS_SELECTOR)[0];

//     container.innerHTML = '';
//     container.appendChild(layout);
//     document.title = context.title;

//     // handle data change click
//     const changeDataAnchor = document.getElementsByClassName(CHANGE_DATA_CLASS_SELECTOR)[0];
//     const cancelDataChangeAnchor = document.getElementsByClassName(CANCEL_DATA_CHANGE_CLASS_SELECTOR)[0];
//     const toggleModeAnchor = changeDataAnchor || cancelDataChangeAnchor

//     const handleChangeDataAnchorClick = () => {
//         const newContext = {...context, readMode: !context.readMode};
//         renderByContext(newContext);
//     }

//     toggleModeAnchor.addEventListener('click', handleChangeDataAnchorClick);

//     // handle form data changes
//     const onFormChande = (fieldName, fieldValue) => {
//         formData[fieldName] = fieldValue;
//     };
//     const onFormValid = () => {
//         console.log(formData);
//     }
//     handleFormInteractions(onFormChande, onFormValid);
// };

// renderByContext(data);

// import { Button } from '../components/Button/index.js';
// // console.log(Button);

// function render(query, block) {
//     const root = document.querySelector(query);
//     root.appendChild(block.getContent());
//     return root;
// }

// const button = new Button({
//     className: 'button',
//     text: 'Click me',
// });

// // app — это id дива в корне DOM
// render('.app', button);

// // Через секунду контент изменится сам, достаточно обновить пропсы
// setTimeout(() => {
//     button.setProps({
//         text: 'Click me, please',
//     });
// }, 1000);

//     container.appendChild(button.getContent());
//     button.setProps({text: "New props"});
//     // Через секунду контент изменится сам, достаточно обновить пропсы
//     setTimeout(() => {
//         button.setProps({
//             text: 'Click me, please',
//         });
//     }, 1000);
