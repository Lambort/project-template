import { STORE_ACTION_TYPE } from '../action';

interface IStoreAction {
    type: STORE_ACTION_TYPE;
    payload: string;
}

interface IStoreState {
    specContent: string | undefined;
}

export type { IStoreAction, IStoreState };
