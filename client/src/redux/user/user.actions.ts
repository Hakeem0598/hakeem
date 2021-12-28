import { ActionType } from './../user/user.types';
import { User } from './user.reducer';

type UserRequestStart = {
    type: ActionType.USER_REQUEST_START;
}

type UserRequestSuccess = {
    type: ActionType.USER_REQUEST_SUCCESS;
    payload: User
}

type UserRequestFailure = {
    type: ActionType.USER_REQUEST_FAILURE;
    payload: string;
}

type SignOut = {
    type: ActionType.SIGN_OUT
}

export type Action = UserRequestStart | UserRequestSuccess | UserRequestFailure | SignOut ;

