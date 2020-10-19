import { BASE_URL } from './baseUrl';
import { Fetcher } from './fetcher';


const CHATS_URL = `${BASE_URL}/chats`;

const CHAT_USERS_URL = `${CHATS_URL}/users`;


export const getChats = () => {
    return Fetcher.get(CHATS_URL);
};

export const createChat = (formData: { title: string }) => {
    return Fetcher.post(CHATS_URL, { data: JSON.stringify(formData) });
};

export const getChatUsers = (id: number) => {
    const chatUrl = `${CHATS_URL}/${id}/users`;

    return Fetcher.get(chatUrl);
};

export const addNewUsersToChat = (formData: { users: number[]; chatId: number }) => {
    return Fetcher.put(CHAT_USERS_URL, { data: JSON.stringify(formData) });
};

export const deleteUsersFromChat = (formData: { users: number[]; chatId: number }) => {
    return Fetcher.delete(CHAT_USERS_URL, { data: JSON.stringify(formData) });
};
