import AvatarFox from '../imgs/Fox.png'
import AvatarBear from '../imgs/Bear.png'
import AvatarOwl from '../imgs/Owl.png'
import AvatarWolf from '../imgs/Wolf.png'

export type StateType = {
    profileData: ProfileDataType
    messagesUsersData: UsersDataType[]
    messagesTextData: TextDataType[]
}

export type ProfileDataType = {
    postData: PostDataType[]
    textPost: string
}

export type PostDataType = {
    id: number
    message: string
    likeCounter: number
}

export type UsersDataType = {
    id: number
    animalName: string
    photoAvatar: string
}

export type TextDataType = {
    id: number
    messageText: string
}

type subscriberType = (state: StateType) => void

export type addPostType = () => void
export type changePostTextType = (t: string) => void


export const state: StateType = {
    messagesUsersData: [
        {id: 1, animalName: 'Fox', photoAvatar: AvatarFox},
        {id: 2, animalName: 'Bear', photoAvatar: AvatarBear},
        {id: 3, animalName: 'Owl', photoAvatar: AvatarOwl},
        {id: 4, animalName: 'Wolf', photoAvatar: AvatarWolf},
    ],
    messagesTextData: [
        {id: 1, messageText: 'Frrr fr fr'},
        {id: 2, messageText: 'Raaaaa!'},
        {id: 3, messageText: 'Wo! Wooo!'},
        {id: 4, messageText: 'Woyyyyy! woyyyy!'},
    ],
    profileData: {
        postData: [
            {id: 1, message: "Beautiful!", likeCounter: 9},
            {id: 2, message: "Have a nice day!", likeCounter: 5},
        ],
        textPost: ''
    }

}

let renderEntireTree: subscriberType

export const addPost = () => {
    if (state.profileData.textPost.trim() !== '') {
        state.profileData.postData.push({
            id: state.profileData.postData.length + 1,
            message: state.profileData.textPost,
            likeCounter: 0
        })
        state.profileData.textPost = ''
        renderEntireTree(state)
    }
}

export const changePostText = (t: string) => {
    state.profileData.textPost = t
    renderEntireTree(state)
}

export const subscriber = (observer: subscriberType) => {
    renderEntireTree = observer
}