import { BASE_URL } from './baseUrl';
import { Fetcher } from './fetcher';


const USER_URL = `${BASE_URL}/user`;

const UPDATE_PROFILE_URL = `${USER_URL}/profile`;
const UPDATE_AVATAR_URL = `${USER_URL}/profile/avatar`;
const UPDATE_PASSWORD_URL = `${USER_URL}/password`;
const SEARCH_USER_URL = `${USER_URL}/search`;


type UpdateUserProfileData = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}
export const updateUserProfile = (formData: UpdateUserProfileData) => {
    return Fetcher.put(UPDATE_PROFILE_URL, { data: JSON.stringify(formData) });
};

export const updateUserPassword = (formData: { oldPassword: string; newPassword: string }) => {
    return Fetcher.put(UPDATE_PASSWORD_URL, { data: JSON.stringify(formData) });
};

export const searchUserByLogin = (formData: { login: string }) => {
    return Fetcher.post(SEARCH_USER_URL, { data: JSON.stringify(formData) });
};

export const updateUserAvatar = (formData: FormData) => {
    const options = {
        headers: {
            // ресет дефолтного content-type
            'content-type': undefined
        },
        data: formData
    };

    return Fetcher.put(UPDATE_AVATAR_URL, options);
};
