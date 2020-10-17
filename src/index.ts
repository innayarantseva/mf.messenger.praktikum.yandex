import { router } from './lib/Router';
import { WithLoader } from './components/WithLoader';
// pages
import { Chats } from './pages/ChatList/chatlist';
import { SignIn } from './pages/Authorization/signIn';
import { SignUp } from './pages/Authorization/signUp';
import { UserProfile } from './pages/UserSettings/userProfile';
import { ChangeUserData } from './pages/UserSettings/changeUserData';

import { getUserInfo } from './api/authorization';

import './colors.css';
import './main.css';

router
    .use('/chats', WithLoader, { blockClass: Chats, getData: getUserInfo })
    .use('/profile', WithLoader, { blockClass: UserProfile, getData: getUserInfo })
    .use('/edit-profile', WithLoader, { blockClass: ChangeUserData, getData: getUserInfo })
    .use('/sign-up', WithLoader, { blockClass: SignUp })
    .use('/', WithLoader, { blockClass: SignIn })
    .start();
