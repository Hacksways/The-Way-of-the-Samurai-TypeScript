import {AppThunkDispatch} from "redux/reduxStore";
import {setApp} from "redux/appReducer";
import {authApi} from "api/autn/auth.api";
import {PropertiesLogin} from "api/autn/auth.types";
import {securityApi} from "api/security/security.api";

export type Auth = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

const SET_USER_DATA = "SET-USER-DATA"

const initialState: Auth = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}


type Action = setAuthUserData

export const authReducer = (state = initialState, action: Action): Auth => {
    switch (action.type) {
        case SET_USER_DATA:

            return {
                ...state,
                ...action.payload.data
            }

        default:
            return state
    }
}

type setAuthUserData = ReturnType<typeof setAuthUserData>

export const setAuthUserData = (data: Auth) => ({
    type: SET_USER_DATA,
    payload: {
        data
    }
} as const)

export const getAuthUserData = async (dispatch: AppThunkDispatch) => {
    dispatch(setApp(false))
    const data = await authApi.me();
    if (data.resultCode === 0) {
        dispatch(setAuthUserData({...data.data, isAuth: true}));
    }
    dispatch(setApp(true));
}


export const login = (payload: PropertiesLogin) =>
    async (dispatch: AppThunkDispatch) => {
        const res  = await authApi.login(payload)
        if (res.resultCode === 0) {
            localStorage.setItem("sn-token",  res.data.token)
            await dispatch(getAuthUserData)
        } else if (res.resultCode === 10) {
            const resCaptcha = await dispatch(securityApi.getCaptchaUrl)
            return {
                message: res.messages[0],
                captchaUrl: resCaptcha.url
            }
        } else {
            return res.messages[0]
        }
    }


export const logout = async (dispatch: AppThunkDispatch) => {
    await authApi.logout()
    localStorage.removeItem("sn-token")
    dispatch(setAuthUserData({
        id: null,
        login: null,
        email: null,
        isAuth: false
    }))
}