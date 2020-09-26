import { router } from './lib/Router.js';
// pages
import { Chats } from './pages/ChatList/chatlist.js';
import { SignIn } from './pages/Authorization/signIn.js';
import { SignUp } from './pages/Authorization/signUp.js';
import { UserProfile } from './pages/UserSettings/userProfile.js';
import { ChangeUserData } from './pages/UserSettings/changeUserData.js';
// import { conversations } from './pages/ChatList/data.js'

router
    .use('/chats', Chats)
    .use('/settings', UserProfile)
    .use('/settings/change', ChangeUserData)
    .use('/sign-up', SignUp)
    .use('/', SignIn)
    .start();
