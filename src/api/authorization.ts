import { BASE_URL } from './baseUrl';
import { Fetcher } from './fetcher';

const AUTH_URL = `${BASE_URL}/auth`;

const GET_USER_INFO_URL = `${AUTH_URL}/user`;
const SIGN_IN_URL = `${AUTH_URL}/signin`;
const SIGN_UP_URL = `${AUTH_URL}/signup`;
const LOGOUT_URL = `${AUTH_URL}/logout`;


export type AuthUserInfo = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string | null;
    login: string;
    email: string;
    phone: string;
    avatar: string | null;
}

export const getUserInfo = () => {
    return Fetcher.get(GET_USER_INFO_URL);
};

export const logOut = () => {
    return Fetcher.post(LOGOUT_URL);
};

export const signIn = (formData: { login: string, password: string }) => {
    return Fetcher.post(SIGN_IN_URL, { data: JSON.stringify(formData) });
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
    return Fetcher.post(SIGN_UP_URL, { data: JSON.stringify(formData) });
};
