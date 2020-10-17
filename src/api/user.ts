import { BASE_URL } from './baseUrl';
import {
    Fetcher,
    FetcherResponse,
    handleFetcherResponse,
    handleUnexpectedError
} from './fetcher';

const USER_URL = `${BASE_URL}/user`;

const UPDATE_PROFILE_URL = `${USER_URL}/profile`;


type UpdateUserProfileData = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}
export const updateUserProfile = (formData: UpdateUserProfileData): Promise<FetcherResponse> => {
    const options = {
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        data: JSON.stringify(formData)
    };

    return Fetcher
        .put(UPDATE_PROFILE_URL, options)
        .then((response) => handleFetcherResponse(response))
        .catch((error) => handleUnexpectedError(error));
};