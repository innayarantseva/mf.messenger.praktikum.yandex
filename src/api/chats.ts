import { BASE_URL } from './baseUrl';
import {
    Fetcher,
    FetcherResponse,
    handleFetcherResponse,
    handleUnexpectedError
} from './fetcher';

const CHATS_URL = `${BASE_URL}/chats`;


export const getChats = (): Promise<FetcherResponse> => {
    const options = {
        credentials: 'include',
        mode: 'cors'
    };

    return Fetcher
        .get(CHATS_URL, options)
        .then((response) => handleFetcherResponse(response))
        .catch((error) => handleUnexpectedError(error));
};

export const createChat = (formData: { title: string }): Promise<FetcherResponse> => {
    const options = {
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        data: JSON.stringify(formData)
    };

    return Fetcher
        .post(CHATS_URL, options)
        .then((response) => handleFetcherResponse(response))
        .catch((error) => handleUnexpectedError(error));
};

export const getChatUsers = (id: number): Promise<FetcherResponse> => {
    const options = {
        credentials: 'include',
        mode: 'cors'
    };

    const chatUrl = `${CHATS_URL}/${id}/users`;

    return Fetcher
        .get(chatUrl, options)
        .then((response) => handleFetcherResponse(response))
        .catch((error) => handleUnexpectedError(error));
};
