import { AxiosError } from 'axios';
import { Dispatch } from "redux";


import api from '../../api';
import { ActionType } from './../user/user.types';
import { Action } from "./user.actions";

export const getMe = () => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.USER_REQUEST_START
    })

    try {
        const { data: { user } } = await api.get('/users/me');
        dispatch({ 
            type: ActionType.USER_REQUEST_SUCCESS, 
            payload: user
        })

    } catch (error) {
        dispatch({ 
            type: ActionType.USER_REQUEST_FAILURE, 
            payload: (error as AxiosError).response?.data.message
        })
    }
}


export const signIn = (email: string, password: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.USER_REQUEST_START
    })

    try {
        const { data: { user } } = await api.create('/auth/sign-in', { email, password });
        dispatch({ 
            type: ActionType.USER_REQUEST_SUCCESS, 
            payload: user
        })

    } catch (error) {
        dispatch({ 
            type: ActionType.USER_REQUEST_FAILURE, 
            payload: (error as AxiosError).response?.data.message
        })
    }
}


export const signOut = () => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.USER_REQUEST_START
    })

    try {
        await api.get('/auth/sign-out');
        dispatch({ 
            type: ActionType.SIGN_OUT, 
        })

    } catch (error) {
        dispatch({ 
            type: ActionType.USER_REQUEST_FAILURE, 
            payload: (error as AxiosError).response?.data.message
        })
    }
}

export const signUp = (firstName: string, lastName: string, email: string, password: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.USER_REQUEST_START
    })

    try {
        const { data: { user } } = await api.create('/auth/sign-up', { firstName, lastName, email, password });
        dispatch({ 
            type: ActionType.USER_REQUEST_SUCCESS, 
            payload: user
        })

    } catch (error) {
        dispatch({ 
            type: ActionType.USER_REQUEST_FAILURE, 
            payload: (error as AxiosError).response?.data.message
        })
    }
}