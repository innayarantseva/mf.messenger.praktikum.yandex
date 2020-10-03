import { router } from './lib/Router';
// pages
import { Chats } from './pages/ChatList/chatlist';
import { SignIn } from './pages/Authorization/signIn';
import { SignUp } from './pages/Authorization/signUp';
import { UserProfile } from './pages/UserSettings/userProfile';
import { ChangeUserData } from './pages/UserSettings/changeUserData';

router
    .use('/chats', Chats)
    .use('/settings', UserProfile)
    .use('/settings/change', ChangeUserData)
    .use('/sign-up', SignUp)
    .use('/', SignIn)
    .start();
