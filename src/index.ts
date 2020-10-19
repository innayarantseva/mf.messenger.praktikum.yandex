import { router } from './lib/Router';
import { WithLoader } from './components/WithLoader';
// pages
import { Chats } from './pages/ChatList/chatlist';
import { SignIn } from './pages/Authorization/signIn';
import { SignUp } from './pages/Authorization/signUp';
import { UserProfile } from './pages/Profile/userProfile';
import { ChangeUserData } from './pages/Profile/changeUserData';
import { ChangeUserPassword } from './pages/Profile/changeUserPassword';
// data providers
import { getUserInfo } from './api/authorization';
import { getChats } from './api/chats';
import { setValue } from './store/store'

import './colors.css';
import './main.css';

router
    .use('/chats', WithLoader, { blockClass: Chats, getData: getChats })
    .use('/profile', WithLoader, { blockClass: UserProfile })
    .use('/edit-profile', WithLoader, { blockClass: ChangeUserData })
    .use('/edit-password', WithLoader, { blockClass: ChangeUserPassword })
    .use('/sign-up', WithLoader, { blockClass: SignUp })
    .use('/', WithLoader, { blockClass: SignIn })

// не изящно, но свою функцию выполняет :)
getUserInfo()
    .then((res) => {
        if (res.ok) {
            if (
                window.location.pathname === '/' ||
                window.location.pathname === '/sign-up'
            ) {
                window.location.pathname = '/chats';
            }
        } else {
            if (
                window.location.pathname !== '/' &&
                window.location.pathname !== '/sign-up'
            ) {
                window.location.pathname = '/';
            }
        }

        setValue({ currentUser: res.response });
        router.start();
    })

