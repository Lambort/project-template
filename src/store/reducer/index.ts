import { initGlobalState } from '../state';
import { STORE_ACTION_TYPE } from '../action';
import { IStoreAction, IStoreState } from '../typings';

const reducer = (state = initGlobalState, action: IStoreAction): IStoreState => {
    switch (action.type) {
        case STORE_ACTION_TYPE.ADD_SPEC_STATE: {
            return { ...state, specContent: action.payload };
        }
        case STORE_ACTION_TYPE.REMOVE_SPEC_STATE: {
            return { ...state, specContent: undefined };
        }
        default: {
            return state;
        }
    }
};

export { reducer };
