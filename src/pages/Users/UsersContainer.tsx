import axios from "axios"
import { Preloader } from "components/Preloader/Preloader"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { ReducersType } from "redux/reduxStore"
import { UserType, UsersType, follow, setCurrentPage, setFetching, setTotalUsersCount, setUsers, unFollow } from "redux/usersReducer"
import { Users } from "./Users"

export type Props = {
    usersData: UsersType
    dispatchFollow: (userId: number) => void
    dispatchUnFollow: (userId: number) => void
    dispatchNewUsers: (users: UserType[]) => void
    dispatchNewCurrentPage: (currentPage: number) => void
    dispatchNewTotalUsersCount: (totalUsersCount: number) => void
    dispatchFetch: (isFething: boolean) => void
}

type BaseResponseType<D = {}> = {
    data: D;
};

type ResponseUsersType = {
    items: UserType[]
    totalCount: number
}

export class UsersAPIClassContainer extends React.Component<Props> {

    componentDidMount(): void {
        this.props.dispatchFetch(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.usersData.pageSize}&page=${this.props.usersData.currentPage}`, { withCredentials: true }).then((res: BaseResponseType<ResponseUsersType>) => {
            this.props.dispatchNewUsers(res.data.items.map(u => ({ ...u, location: { country: "Belarus", city: "Minsk" } })));
            this.props.dispatchNewTotalUsersCount(res.data.totalCount)
            this.props.dispatchFetch(false)
        });
    }

    follow = (userId: number) => {
        this.props.dispatchFollow(userId);
    }

    unFollow = (userId: number) => {
        this.props.dispatchUnFollow(userId)
    }

    onClickPageHandler = (page: number) => {
        this.props.dispatchFetch(true)
        this.props.dispatchNewCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.usersData.pageSize}&page=${page}`, { withCredentials: true }).then((res: BaseResponseType<ResponseUsersType>) => {
            this.props.dispatchNewUsers(res.data.items.map(u => ({ ...u, location: { country: "Belarus", city: "Minsk" } })));
            this.props.dispatchNewTotalUsersCount(res.data.totalCount)
            this.props.dispatchFetch(false)
        });
    }

    render() {
        return <>
            {this.props.usersData.isFetching ? <Preloader /> : <Users usersData={this.props.usersData} follow={this.follow} unFollow={this.unFollow} onClickPageHandler={this.onClickPageHandler} />}
        </>
    }
}

export const UsersContainer = () => {

    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)
    const dispatch = useDispatch()

    const dispatchFollow = (userId: number) => {
        dispatch(follow(userId))
    }
    const dispatchUnFollow = (userId: number) => {
        dispatch(unFollow(userId))
    }
    const dispatchNewUsers = (users: UserType[]) => {
        dispatch(setUsers(users))
    }
    const dispatchNewCurrentPage = (currentPage: number) => {
        dispatch(setCurrentPage(currentPage))
    }
    const dispatchNewTotalUsersCount = (totalUsersCount: number) => {
        dispatch(setTotalUsersCount(totalUsersCount))
    }
    const dispatchFetch = (isFething: boolean) => {
        dispatch(setFetching(isFething))
    }

    return <UsersAPIClassContainer usersData={usersData} dispatchFollow={dispatchFollow} dispatchUnFollow={dispatchUnFollow} dispatchNewUsers={dispatchNewUsers} dispatchNewCurrentPage={dispatchNewCurrentPage} dispatchNewTotalUsersCount={dispatchNewTotalUsersCount} dispatchFetch={dispatchFetch} />

}