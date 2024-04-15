import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { socketService } from './socket.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USERS = 'users'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore,
    getEmptyUser,
    getDemoUser
}

window.userService = userService


async function getUsers() {
    const users = await storageService.query(STORAGE_KEY_USERS)
    if (!users || !users.length) _createUsers()
    return storageService.query(STORAGE_KEY_USERS)
    // return httpService.get(`user`)
}



async function getById(userId) {
    const user = await storageService.get('users', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    const user = await storageService.get('user', _id)
    user.score = score
    await storageService.put('user', user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})

    // When admin updates other user's details, do not update loggedinUser
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    userCred.score = 10000
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, username: user.username, imgUrl: user.imgUrl, savedStoryIds: user.savedStoryIds, following: user.following, followers: user.follower, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyUser() {
    return {
        username: "",
        password: "",
        fullname: "",
        imgUrl: '',
        bio: '',
        following: [],
        followers: [],
        savedStoryIds: []
    }
}

function getDemoUser() {
    return {
        _id: "u101",
        username: "Muko",
        password: "mukmuk",
        fullname: "Muki Muka",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/73.jpg",
        following: [
            {
                _id: "u106",
                fullname: "Dob",
                imgUrl: "http://some-img"
            }
        ],
        followers: [
            {
                _id: "u105",
                fullname: "Bob",
                imgUrl: "http://some-img"
            }
        ],
        savedStoryIds: [
            "s104",
            "s111",
            "s123"
        ]
    };

}


function _createUsers() {
    const user = [
        {
            _id: "u101",
            username: "Muko",
            password: "mukmuk",
            fullname: "Muki Muka",
            imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/73.jpg",
            following: [
                {
                    _id: "u106",
                    fullname: "Dob",
                    imgUrl: "http://some-img"
                }
            ],
            followers: [
                {
                    _id: "u105",
                    fullname: "Bob",
                    imgUrl: "http://some-img"
                }
            ],
            savedStoryIds: [
                "s104",
                "s111",
                "s123"
            ]
        },
        {
            username: "Vasya",
            password: "12345",
            fullname: "Vasya Vasilivich",
            imgUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            bio: 'Traveling and sharing my life! Folow me to see more!',
            following: [
                {
                    _id: "u106",
                    fullname: "Dob",
                    imgUrl: "http://some-img"
                },
                {
                    _id: "u100",
                    fullname: "Rob",
                    imgUrl: "http://some-img"
                }
            ],
            followers: [
                {
                    _id: "u115",
                    fullname: "Mob",
                    imgUrl: "http://some-img"
                },
                {
                    _id: "u125",
                    fullname: "Gob",
                    imgUrl: "http://some-img"
                },
                {
                    _id: "u135",
                    fullname: "Fob",
                    imgUrl: "http://some-img"
                }
            ],
            savedStoryIds: [
                "s104",
                "s111",
                "s123"
            ]
        }
    ]
    storageService._save(STORAGE_KEY_USERS, user)
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



