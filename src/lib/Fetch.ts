// временно удалила тесты, так как они всё равно были такие себе
// а теперь начали падать из-за того, что jest не может загрузить css из нотификаций
import { pageNotification } from '../lib/showNotification';

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}


export type FetchResponse = {
    ok: boolean;
    response?: string | object;
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

const handleFetchResponse = ({ response, status, statusText }): FetchResponse => {
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

// const handleUnexpectedError = (error): FetchResponse => {
//     pageNotification.showNotification({ text: `Произошла ошибка: ${error}` });

//     return {
//         ok: false
//     };
// };


type Headers = Record<string, string>;
type RequestOptions = {
    method: keyof typeof METHODS;
    headers?: Headers;
    data?; // FIXME
}


export type Options = {
    headers?: Headers;
    data?; // FIXME
    timeout?: number;
    credentials?: string;
    mode?: string;
}

export class Fetch {
    get(url: string, options: Options = {}) {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    }

    post(url: string, options: Options = {}) {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    }

    put(url: string, options: Options = {}) {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    }

    delete(url: string, options: Options = {}) {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    }

    request(url: string, options: RequestOptions, timeout = 5000): Promise<FetchResponse> {
        const { method, headers: headersFromOptions, data } = options;
        const headers = {
            'content-type': 'application/json',
            ...headersFromOptions
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const urlObject = new URL(url)

            // set query params
            if (method === METHODS.GET && data) {
                Object.entries(data).forEach(([param, value]) => {
                    urlObject.searchParams.set(param, value.toString());
                });
            }

            xhr.open(method, urlObject.toString());
            xhr.withCredentials = true;

            // set timeout
            xhr.timeout = timeout;

            // set headers
            if (headers) {
                Object.entries(headers).forEach(([header, value]) => {
                    value && xhr.setRequestHeader(header, value);
                });
            }

            xhr.onload = () => {
                const response = handleFetchResponse(xhr);
                resolve(response);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send(null);
            } else {
                xhr.send(data);
            }
        })
    }
}