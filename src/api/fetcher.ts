import { Fetch } from '../lib/Fetch';
import { pageNotification } from '../lib/showNotification';


export type FetcherResponse = {
    ok: boolean;
    response?: string | JSON;
}

const getErrorText = (
    response: string | undefined,
    status: number,
    statusText: string
): string => {
    let error: string;

    try {
        const json = JSON.parse(response);
        error = json.reason;
    } catch {
        error = `${status} ${statusText}. Ответ сервера: ${response}`;
    }

    return error;
};

const getResponse = (responseStirng) => {
    let response: string;

    try {
        const json = JSON.parse(responseStirng);
        response = json;
    } catch {
        response = responseStirng;
    }

    return response;
};

export const handleFetcherResponse = ({ response, status, statusText }): FetcherResponse => {
    if (status === 204) {
        // не уверенна, насколько это правильно
        // но я по 204 коду ответа не хочу производить действия, как по 200
        return {
            ok: false
        };
    } else if (status === 200) {
        pageNotification.hideNotification();

        return {
            ok: true,
            response: getResponse(response)
        };
    } else {
        const error = getErrorText(response, status, statusText);
        pageNotification.showNotification({ text: `Произошла ошибка: ${error}` });

        return {
            ok: false
        };
    }
};

export const handleUnexpectedError = (error): FetcherResponse => {
    pageNotification.showNotification({ text: `Произошла ошибка: ${error}` });
    return {
        ok: false
    };
};

export const Fetcher = new Fetch();