import {Preloader} from "components/Preloader"
import React, {useCallback, useEffect} from "react"
import {useSelector} from "react-redux"
import {ReducersType, useAppDispatch} from "redux/reduxStore"
import {followOnUser, getUsers, setItemsPerPage, setPagination, unfollowOnUser, UsersType} from "redux/usersReducer"
import {Users} from "./Users"

export const UsersContainer = () => {

    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsers(usersData.pageSize, usersData.currentPage))
    }, []);

    const follow = useCallback((userID: number) => {
        dispatch(followOnUser(userID))
    },[dispatch])

    const unfollow = useCallback((userID: number) => {
        dispatch(unfollowOnUser(userID))
    },[dispatch])

    const setCurrentPage = useCallback((page: number) => {
        dispatch(setPagination(usersData.pageSize, page))
    },[dispatch])

    const setPageSize = useCallback((pageSize: number) => {
        dispatch(setItemsPerPage(pageSize, usersData.currentPage))
    },[dispatch])

    return <>
        {usersData.isFetching ? <Preloader/> :
            <Users usersData={usersData} follow={follow} unFollow={unfollow}
                   setCurrentPage={setCurrentPage} setPageSize={setPageSize}/>}
    </>

}