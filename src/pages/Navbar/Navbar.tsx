import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {UsersDataType} from "redux/messagesReducer";
import {ReducersType} from 'redux/reduxStore';
import {FriendsSection} from "./FriendsSection";
import s from 'pages/Navbar/Navbar.module.scss';
import React from "react";


export const Navbar = () => {
    const friendsData = useSelector<ReducersType, UsersDataType[]>(state => state.messagesData.messagesUsersData)
    const currentUserID = useSelector<ReducersType, number | null>(state=> state.auth.id)
    return (
        <nav className={s.navbar}>
            <h3 className={s.label}>Menu</h3>
            <div className={s.navButtonsSection}>
                <span>
                    <NavLink to={`/profile/${currentUserID}`} className={s.item}>Profile</NavLink>
                </span>
                <span>
                    <NavLink to='/messages'
                             className={s.item}>Message</NavLink>
                </span>
                <span>
                    <NavLink to='/users'
                             className={s.item}>Users</NavLink>
                </span>
                <span>
                    <NavLink to='/news' className={s.item}>News</NavLink>
                </span>
                <span>
                    <NavLink to='/music' className={s.item}>Music</NavLink>
                </span>
                <span>
                    <NavLink to='/settings'
                             className={s.item}>Settings</NavLink>
                </span>
            </div>
            <FriendsSection friendsData={friendsData}/>
        </nav>
    )
}