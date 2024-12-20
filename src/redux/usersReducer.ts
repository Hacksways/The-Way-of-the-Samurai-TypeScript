import {usersAPI} from "api/api";
import {AppThunkDispatch} from "redux/reduxStore";

export type UsersType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

export type UserType = {
    id: number
    name: string
    photos: { small: string | null, large: string | null }
    status?: string | undefined
    followed: boolean
    toggleFollowing: boolean
}

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const SET_FETCHING = "SET-FETCHING"
const TOGGLE_FOLLOWING = "TOGGLE-FOLLOWING"
const SET_PAGE_SIZE = "SET-PAGE-SIZE"

const initialState: UsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
}


type ActionType =
    | Follow
    | UnFollow
    | SetUsers
    | SetCurrentPage
    | setTotalUsersCount
    | setFetching
    | SetToggleFollowing
    | SetPageSize


export const usersReducer = (state = initialState, action: ActionType): UsersType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)
            }

        case UNFOLLOW:
            return {
                ...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)
            }

        case SET_USERS:
            return {...state, users: action.users}

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}

        case SET_FETCHING:
            return {...state, isFetching: action.isFetching}

        case TOGGLE_FOLLOWING: {
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? {
                    ...u,
                    toggleFollowing: action.toggleFollowing
                } : u)
            }
        }

        case SET_PAGE_SIZE : {
            return {...state, pageSize: action.pageSize}
        }

        default:
            return state
    }
}
type Follow = ReturnType<typeof follow>
type UnFollow = ReturnType<typeof unFollow>
type SetUsers = ReturnType<typeof setUsers>
type SetCurrentPage = ReturnType<typeof setCurrentPage>
type setTotalUsersCount = ReturnType<typeof setTotalUsersCount>
type setFetching = ReturnType<typeof setFetching>
type SetToggleFollowing = ReturnType<typeof setToggleFollowing>
type SetPageSize = ReturnType<typeof setPageSize>

export const follow = (userID: number) => ({
    type: FOLLOW,
    userID
} as const)

export const unFollow = (userID: number) => ({
    type: UNFOLLOW,
    userID
} as const)

export const setUsers = (users: UserType[]) => ({
    type: SET_USERS,
    users
} as const)

export const setCurrentPage = (currentPage: number) => ({
    type: SET_CURRENT_PAGE,
    currentPage
} as const)

export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
} as const)

export const setFetching = (isFetching: boolean) => ({
    type: SET_FETCHING,
    isFetching
} as const)

export const setToggleFollowing = (userID: number, toggleFollowing: boolean) => ({
    type: TOGGLE_FOLLOWING,
    userID,
    toggleFollowing
} as const)

export const setPageSize = (pageSize: number) => ({
    type: SET_PAGE_SIZE,
    pageSize,
} as const)


export const getUsers = (pageSize: number, currentPage: number, friend?: boolean, term?: string) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setFetching(true))

        const res = await usersAPI.getUsers(pageSize, currentPage, friend)

        if (!res.error) {
            dispatch(setCurrentPage(currentPage))
            dispatch(setUsers(res.items))
            dispatch(setTotalUsersCount(res.totalCount))
        }
        dispatch(setFetching(false))
    }


export const setPagination = (pageSize: number, page: number) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setFetching(true))
        dispatch(setCurrentPage(page))

        const res = await usersAPI.getUsers(pageSize, page)

        if (!res.error) {
            dispatch(setUsers(res.items))
            dispatch(setTotalUsersCount(res.totalCount))
        }

        dispatch(setFetching(false))
    }


export const setItemsPerPage = (pageSize: number, currentPage: number) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setFetching(true))
        dispatch(setPageSize(pageSize))

        const res = await usersAPI.getUsers(pageSize, currentPage)

        if (!res.error) {
            dispatch(setUsers(res.items))
            dispatch(setTotalUsersCount(res.totalCount))
        }

        dispatch(setFetching(false))
    }


export const followOnUser = (userID: number) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setToggleFollowing(userID, true))

        const res = await usersAPI.follow(userID)

        if (res.resultCode === 0) {
            dispatch(follow(userID))
        }

        dispatch(setToggleFollowing(userID, false))
        return {}

    }

export const unfollowOnUser = (userID: number) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setToggleFollowing(userID, true))

        const res = await usersAPI.unFollow(userID)

        if (res.resultCode === 0) {
            dispatch(unFollow(userID))
        }

        dispatch(setToggleFollowing(userID, false))
    }

export const checkFollowedUser = async (userID: number) => {
    return await usersAPI.checkFollowed(userID)
}