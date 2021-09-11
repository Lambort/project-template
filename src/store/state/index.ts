import { IStoreState } from '../typings';

const initGlobalState: IStoreState = {
    specContent: JSON.parse(sessionStorage.getItem('spec') || '{"spec":""}'),
};

export { initGlobalState };
