import { IStoreAction, IStoreState } from './typings';
import { STORE_ACTION_TYPE } from './action';
import { initGlobalState } from './state';
import { reducer } from './reducer';

export { STORE_ACTION_TYPE, initGlobalState, reducer };
export type { IStoreAction, IStoreState };
