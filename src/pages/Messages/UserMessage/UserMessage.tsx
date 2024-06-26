import React, {memo} from "react";
import s from 'pages/Messages/UserMessage/UserMessage.module.scss'
import {useParams} from "react-router-dom";
import {TextDataType} from "redux/messagesReducer";


export const UserMessage = memo(({id, messageText}: TextDataType) => {
    const {uID} = useParams()
    const style = (uID !== undefined && id === +uID) ? s.currentCircle : s.circle

    return <div className={s.messageItem}>
        <div className={style}></div>
        {messageText}</div>
})