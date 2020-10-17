import { BASE_URL } from './baseUrl';
import {
    Fetcher,
    FetcherResponse,
    handleFetcherResponse,
    handleUnexpectedError
} from './fetcher';

const AUTH_URL = `${BASE_URL}/auth`;

const GET_USER_INFO_URL = `${AUTH_URL}/user`;
const SIGN_IN_URL = `${AUTH_URL}/signin`;
const SIGN_UP_URL = `${AUTH_URL}/signup`;
const LOGOUT_URL = `${AUTH_URL}/logout`;


export const getUserInfo = (): Promise<FetcherResponse> => {
    const options = {
        credentials: 'include',
        mode: 'cors'
    };

    return Fetcher
        .get(GET_USER_INFO_URL, options)
        .then((response) => handleFetcherResponse(response))
        .catch((error) => handleUnexpectedError(error));
};

export const logOut = () => {
    const options = {
        credentials: 'include',
        mode: 'cors'
    };

    return Fetcher
        .post(LOGOUT_URL, options)
        .then((response) => handleFetcherResponse(response))
        .catch((error) => handleUnexpectedError(error));
};

export const signIn = (formData: { login: string, password: string }) => {
    const options = {
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        data: JSON.stringify(formData)
    };

    return Fetcher
        .post(SIGN_IN_URL, options)
        .then((response) => handleFetcherResponse(response))
        .catch((error) => handleUnexpectedError(error));
};

type SignUpData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}
export const signUp = (formData: SignUpData) => {
    const options = {
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        data: JSON.stringify(formData)
    };

    return Fetcher
        .post(SIGN_UP_URL, options)
        .then((response) => handleFetcherResponse(response))
        .catch((error) => handleUnexpectedError(error));
};
