import {profileAPI} from "api/profile/profile.api";
import {AppRootStateType, AppThunkDispatch} from "redux/reduxStore";
import {ProfileUserResponseType} from "api/profile/profile.types";

const ADD_POST = "ADD-POST";
const CHANGE_POST_TEXT = "CHANGE-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";

export type ProfileDataType = {
    postData: PostDataType[]
    textPost: string
    profile: UtilityProfileUserType
    status: string
}

export type PostDataType = {
    id: number
    message: string
    likeCounter: number
}

export type UtilityProfileUserType = Partial<ProfileUserResponseType>

const initialState: ProfileDataType = {
    postData: [],
    textPost: "",
    profile: {},
    status: ""
}

type ActionType =
    | AddPostType
    | ChangePostTextType
    | SetUserProfileType
    | SetStatusType


export const profileReducer = (state = initialState, action: ActionType): ProfileDataType => {

    switch (action.type) {
        case ADD_POST:
            if (state.textPost.trim() !== "") {

                return {
                    ...state, postData: [{
                        id: state.postData.length + 1,
                        message: state.textPost,
                        likeCounter: 0,
                    }, ...state.postData], textPost: ""
                }

            }

            return state

        case CHANGE_POST_TEXT:

            return {...state, textPost: action.payload.newText};

        case SET_USER_PROFILE:

            return {...state, profile: action.payload.profile}

        case SET_STATUS :
            return {...state, status: action.status}


        default:
            return state;
    }
};


type AddPostType = ReturnType<typeof addPost>
type ChangePostTextType = ReturnType<typeof changePostText>
type SetUserProfileType = ReturnType<typeof setUserProfile>
type SetStatusType = ReturnType<typeof setStatus>


export const addPost = () => ({type: ADD_POST} as const);

export const changePostText = (newText: string) => ({
    type: CHANGE_POST_TEXT,
    payload: {
        newText,
    },
} as const);

export const  setUserProfile = (profile: Partial<ProfileUserResponseType>) => ({
    type: SET_USER_PROFILE,
    payload: {
        profile,
    },
} as const);

export const setStatus = (status: string) => ({
    type: SET_STATUS,
    status
} as const)

export const getUserProfile = (id: number) =>
    async (dispatch: AppThunkDispatch) => {
        const res = await profileAPI.getProfile(id)
        dispatch(setUserProfile(res))
    }


export const getUserStatus = (id: number) =>
    async (dispatch: AppThunkDispatch) => {
        const res = await profileAPI.getStatus(id)
        dispatch(setStatus(res))
    }


export const changeUserStatus = (status: string) =>
    async (dispatch: AppThunkDispatch) => {
        const res = await profileAPI.updateStatus(status)

        if (res.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }


export const changeUserName = (fullName: string) =>
    async (dispatch: AppThunkDispatch) => {
        const res = await profileAPI.updateProfileName(fullName)

        if (res.resultCode === 0) {
            dispatch(setUserProfile({fullName}))
        }
    }

export const updateProfile = (userData: ProfileUserResponseType) =>
    async (dispatch: AppThunkDispatch) => {
        const res = await profileAPI.updateProfile(userData)

        if (res.resultCode === 0) {
            dispatch(setUserProfile({...userData}))
        }
        if (res.resultCode === 1) {
            const searchString = "The LookingForAJobDescription field is required. (LookingForAJobDescription)";
            const replacementString = "The My professional skills field is required. (LookingForAJobDescription)";

            return res.messages.map(message =>
                message === searchString ? replacementString : message
            )
        }
    }

export const setNewUserAvatar = (photos: File) =>
    async (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
        const res = await profileAPI.updateAvatar(photos)
        if (res.resultCode === 0) {
            await dispatch(getUserProfile(getState().auth.id as number))
        } else if (res.resultCode === 1) {
            return res.messages[0]
        }
    }