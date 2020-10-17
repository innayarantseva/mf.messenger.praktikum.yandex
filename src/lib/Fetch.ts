enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}


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
    get = function (url: string, options: Options = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    }

    post = function (url: string, options: Options = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    }

    put = function (url: string, options: Options = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    }

    delete = function (url: string, options: Options = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    }

    request = (url: string, options: RequestOptions, timeout = 5000) => {
        const { method, headers, data } = options;

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
                    xhr.setRequestHeader(header, value);
                });
            }

            xhr.onload = () => resolve(xhr);

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send(null);
            } else {
                xhr.send(data);
            }
        })
    };
}