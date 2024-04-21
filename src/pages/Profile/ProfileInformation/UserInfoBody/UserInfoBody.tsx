import {UtilityProfileUserType} from 'redux/profileReducer';
import s from 'pages/Profile/ProfileInformation/ProfileInformation.module.css';
import {Typography} from "components/Typography";
import {TextField} from "components/TextField";
import {ChangeEvent, memo, MutableRefObject} from "react";
import {Button} from "components/Button";
import {Edit} from "assets/icons/Edit";

type Props = {
    profile?: UtilityProfileUserType
    status: string
    edit: boolean
    toggleEditHandler: () => void
    changeStatusHandler: (value: ChangeEvent<HTMLInputElement>) => void
    setEditForm: (value: boolean) => void
}

export const UserInfoBody = memo(({
                                      profile,
                                      status,
                                      edit,
                                      toggleEditHandler,
                                      changeStatusHandler,
                                      setEditForm
                                  }: Props) => {

    return (
        <div className={s.userInfoBody}>
            <Button onClick={() => setEditForm(true)}>Change</Button>
            <ul className={s.personalInfoTable}>
                <li>
                    <div>
                        <b>Name: </b>
                        <Typography variant={'h3'} as={'span'} id={'fullName'}>{profile?.fullName}</Typography>
                    </div>
                </li>
                <li>
                    {edit &&
                        <div>
                            <b>Status: </b>
                            <TextField onBlur={toggleEditHandler} autoFocus value={status}
                                       onChange={changeStatusHandler}/>
                        </div>
                    }
                    {!edit &&
                        <div>
                            <b>Status: </b>
                            <Typography variant={'subtitle2'}
                                        as={'span'}
                                        onDoubleClick={toggleEditHandler}>{status}</Typography>
                        </div>
                    }
                </li>
                <li>
                    <div>
                        <b>Looking for a job:</b> <Typography variant={'subtitle2'}
                                                              as={'span'}>{profile?.lookingForAJob}</Typography>
                    </div>
                </li>
                <li>
                    <div>
                        <b>My professional skills:</b> <Typography variant={'subtitle2'}
                                                                   as={'span'}>{profile?.lookingForAJobDescription}</Typography>
                    </div>
                </li>
                <li>
                    <div>
                        <b>About me: </b> <Typography variant={'subtitle2'}
                                                      as={'span'}>{profile?.aboutMe}</Typography>
                    </div>
                </li>
                <li>
                    <div>
                        <b>Contacts: </b>{(profile?.contacts && Object.keys(profile.contacts).map(c => (
                        <Typography key={c}>{profile.contacts[c] || 'не указано'}</Typography>
                    ))) || null}
                    </div>
                </li>

            </ul>


        </div>
    )
})