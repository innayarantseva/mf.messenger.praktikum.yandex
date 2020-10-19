import { AuthUserInfo } from '../api/authorization';
import { cloneDeep } from '../utils/mydash/deepClone';


type AppStore = {
    currentUser?: AuthUserInfo;
}

let store: AppStore = {
    currentUser: undefined
};

const mixNewValue = (newValue: AppStore) => {
    store = { ...store, ...newValue };
    console.log(store)
};

export const getValue = () => {
    return cloneDeep(store);
};

export const setValue = (nextValue) => {
    mixNewValue(nextValue);
};