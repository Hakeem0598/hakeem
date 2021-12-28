import { RequestStatus } from "../../shared/types"
import { Action } from './user.actions';
import { ActionType } from "./user.types";

export type User = {
    _id: string;
}

export type UserState = {
    status: RequestStatus;
    error: string | null;
    currentUser: User | null;
}

const INITIAL_STATE: UserState = {
    status: 'idle',
    error: null,
    currentUser: null
}

const userReducer = (state: UserState = INITIAL_STATE, action: Action): UserState => {
    switch(action.type) {
        case ActionType.USER_REQUEST_START:
            return {
                currentUser: null,
                status: 'pending',
                error: null
            }

        case ActionType.USER_REQUEST_SUCCESS:
            return {
                currentUser: action.payload,
                status: 'fulfilled',
                error: null
            }
        
        case ActionType.USER_REQUEST_FAILURE:
            return {
                currentUser: null,
                status: 'rejected',
                error: action.payload
            }

        case ActionType.SIGN_OUT:
            return {
                currentUser: null,
                status: 'idle',
                error: null
            }
        
        default:
            return { ...state };
    }
}

export default userReducer;
