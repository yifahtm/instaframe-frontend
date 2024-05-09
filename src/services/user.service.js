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
    getDemoUser,
    filterUsers
}

window.userService = userService

function filterUsers(filterBy, users) {
    if (!users.length) return
    const regex = new RegExp(filterBy.txt, 'i')
    users = users.filter(user => {
        return regex.test(user.username)
    })
    return users
}

async function getUsers() {
    const users = await storageService.query(STORAGE_KEY_USERS)
    if (!users || !users.length) _createUsers()
    // return storageService.query(STORAGE_KEY_USERS)
    return httpService.get(`user`)
}



async function getById(userId) {
    // const user = await storageService.get('users', userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    // const user = await storageService.get('user', _id)
    // user.score = score
    // await storageService.put('user', user)

    const user = await httpService.put(`user/${_id}`, { _id, score })

    // When admin updates other user's details, do not update loggedinUser
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    userCred.score = 10000
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    return await httpService.post('auth/logout')
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
        _id: "u102",
        username: "Muko",
        password: "mukmuk",
        fullname: "Muki Muka",
        imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/73.jpg",
        bio: 'Social media artist 🎨✨,  High end model💃🏼, Mommy🤰🏼',
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
    const users = [
        {
            _id: "u1022",
            username: "Muko",
            password: "mukmuk",
            fullname: "Muki Muka",
            imgUrl: "https://xsgames.co/randomusers/assets/avatars/female/73.jpg",
            bio: 'Social media artist 🎨✨,  High end model💃🏼, Mommy🤰🏼',
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
            _id: "u1011",
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
        },
        {
            _id: "u1033",
            fullname: "Deniska",
            username: "denchik1996",
            imgUrl: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            password: "12345",
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
        },
        {
            _id: "u1044",
            username: "miniGun777",
            fullname: "Bob",
            imgUrl: "https://st2.depositphotos.com/3143277/8644/i/600/depositphotos_86446164-stock-photo-business-man-in-office.jpg",
            password: "12345",
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
        },
        {
            _id: "u1055",
            fullname: "Bob",
            username: "Amarama_1990",
            imgUrl: "https://i.pinimg.com/280x280_RS/52/97/74/52977407847a9767757d40bb93644b58.jpg",
            password: "12345",
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
        },
        {
            _id: "u1066",
            fullname: "Ulash Ulashi",
            username: "ulash888",
            imgUrl: "https://i.pinimg.com/736x/28/3a/b1/283ab1108ef8e379a2e555de019e1aee.jpg",
            password: "12345",
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
        },
        {
            _id: "u1077",
            fullname: "Bobby bob",
            username: "RobbyBoby21",
            imgUrl: "https://i.pinimg.com/474x/85/59/09/855909df65727e5c7ba5e11a8c45849a.jpg",
            password: "12345",
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
        },
        {
            _id: "seller1",
            fullname: "Lady Shoes & Bags 👠",
            username: "lady_shoes_and_bags",
            imgUrl: "https://cdn.shopify.com/s/files/1/0074/6320/7027/articles/ultimate-guide-to-womens-bags_2048x.jpg?v=1572446822",
            password: "12345",
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
        },
        {
            _id: "seller3",
            fullname: "chanelofficial",
            username: "chanelofficial",
            imgUrl: "http://cdn.shopify.com/s/files/1/0434/3103/5031/products/Sticker-autocollant-Logo-chanel-metallique-Deco-Sticker-Store-412.png?v=1672147188",
            password: "12345",
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
        },
        {
            _id: "u1088",
            username: "redBread",
            fullname: "Dob",
            imgUrl: "src/assets/imgs/chatsImg/tegan-mierle-ioyEITUD2G8-unsplash.jpg",
            password: "12345",
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
        },
        {
            _id: "u1099",
            username: "Amarama_1990",
            fullname: "Bob",
            imgUrl: "src/assets/imgs/chatsImg/craig-mckay-jmURdhtm7Ng-unsplash.jpg",
            password: "12345",
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
        },
        {
            _id: "u101010",
            username: "Amarama_1990",
            fullname: "Bob",
            imgUrl: "src/assets/imgs/chatsImg/ethan-hoover-0YHIlxeCuhg-unsplash.jpg",
            password: "12345",
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
        },
        {
            _id: "u101111",
            username: "Guenna",
            password: "12345",
            fullname: "Guenna Barns",
            imgUrl: 'src/assets/imgs/chatsImg/houcine-ncib-B4TjXnI0Y2c-unsplash.jpg',
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
        },
        {
            _id: "u101212",
            username: "Shalom",
            password: "12345",
            fullname: "Shalom Rahamim",
            imgUrl: 'src/assets/imgs/chatsImg/jonas-kakaroto-mjRwhvqEC0U-unsplash.jpg',
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
        },
        {
            _id: "u101313",
            username: "Sugen",
            password: "12345",
            fullname: "Sugen Kyoto",
            imgUrl: 'src/assets/imgs/chatsImg/joseph-pearson-827XUhVSp8M-unsplash.jpg',
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
        },
        {
            _id: "u101414",
            username: "Merry",
            password: "12345",
            fullname: "Merry Brons",
            imgUrl: 'src/assets/imgs/chatsImg/karl-magnuson-85J99sGggnw-unsplash.jpg',
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
        },
        {
            _id: "u101515",
            username: "Elio",
            password: "12345",
            fullname: "Elio Vasquez",
            imgUrl: 'src/assets/imgs/chatsImg/kelly-sikkema-JN0SUcTOig0-unsplash.jpg',
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
        },
        {
            _id: "u101616",
            username: "Spring",
            password: "12345",
            fullname: "Spirng Hollow",
            imgUrl: 'src/assets/imgs/chatsImg/matheus-ferrero-pg_WCHWSdT8-unsplash.jpg',
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
        },
        {
            _id: "u101717",
            username: "Durma",
            password: "12345",
            fullname: "Durma Babylon",
            imgUrl: 'src/assets/imgs/chatsImg/mubariz-mehdizadeh-t3zrEm88ehc-unsplash.jpg',
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
        },
        {
            _id: "u101818",
            username: "Eliya",
            password: "12345",
            fullname: "Eliya Photos",
            imgUrl: 'src/assets/imgs/chatsImg/noah-silliman-gzhyKEo_cbU-unsplash.jpg',
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
        },
        {
            _id: "u101919",
            username: "Sunset",
            password: "12345",
            fullname: "Sunset Grace",
            imgUrl: 'src/assets/imgs/chatsImg/pablo-heimplatz-EAvS-4KnGrk-unsplash.jpg',
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
        },
        {
            _id: "u102020",
            username: "Shlomo_Vintage_Photography",
            password: "12345",
            fullname: "Shlomo Hagoel",
            imgUrl: 'src/assets/imgs/chatsImg/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg',
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
        },
        {
            _id: "u102121",
            username: "Loram",
            password: "12345",
            fullname: "Lora Mallark",
            imgUrl: 'src/assets/imgs/chatsImg/stefan-stefancik-QXevDflbl8A-unsplash.jpg',
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
        },
        {
            _id: "u102222",
            username: "AliYo",
            password: "12345",
            fullname: "Ali Yossef",
            imgUrl: 'src/assets/imgs/chatsImg/tegan-mierle-ioyEITUD2G8-unsplash.jpg',
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
        },
        {
            _id: "u102323",
            username: "Gracie_I",
            password: "12345",
            fullname: "Gracie Illinovitz",
            imgUrl: 'src/assets/imgs/chatsImg/christopher-campbell-rDEOVtE7vOs-unsplash.jpg',
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
        },
    ]
    storageService._save(STORAGE_KEY_USERS, users)
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()




// {
//     "username": "Muko",
//         "password": "mukmuk",
//             "fullname": "Muki Muka",
//                 "imgUrl": "https://xsgames.co/randomusers/assets/avatars/female/73.jpg",
//                     "bio": "Social media artist 🎨✨,  High end model💃🏼, Mommy🤰🏼",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u105",
//                                     "fullname": "Bob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "Vasya",
//         "password": "12345",
//             "fullname": "Vasya Vasilivich",
//                 "imgUrl": "https: //images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "fullname": "Deniska",
//         "username": "denchik1996",
//             "imgUrl": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//                 "password": "12345",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "miniGun777",
//         "fullname": "Bob",
//             "imgUrl": "https://st2.depositphotos.com/3143277/8644/i/600/depositphotos_86446164-stock-photo-business-man-in-office.jpg",
//                 "password": "12345",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "fullname": "Bob",
//         "username": "Amarama_1990",
//             "imgUrl": "https://i.pinimg.com/280x280_RS/52/97/74/52977407847a9767757d40bb93644b58.jpg",
//                 "password": "12345",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "fullname": "Ulash Ulashi",
//         "username": "ulash888",
//             "imgUrl": "https://i.pinimg.com/736x/28/3a/b1/283ab1108ef8e379a2e555de019e1aee.jpg",
//                 "password": "12345",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "fullname": "Bobby bob",
//         "username": "RobbyBoby21",
//             "imgUrl": "https://i.pinimg.com/474x/85/59/09/855909df65727e5c7ba5e11a8c45849a.jpg",
//                 "password": "12345",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 '"imgUrl"': "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "fullname": "Lady Shoes & Bags 👠",
//         "username": "lady_shoes_and_bags",
//             "imgUrl": "https://cdn.shopify.com/s/files/1/0074/6320/7027/articles/ultimate-guide-to-womens-bags_2048x.jpg?v=1572446822",
//                 "password": "12345",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "fullname": "chanelofficial",
//         "username": "chanelofficial",
//             "imgUrl": "http://cdn.shopify.com/s/files/1/0434/3103/5031/products/Sticker-autocollant-Logo-chanel-metallique-Deco-Sticker-Store-412.png?v=1672147188",
//                 "password": "12345",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "redBread",
//         "fullname": "Dob",
//             "imgUrl": "src/assets/imgs/chatsImg/tegan-mierle-ioyEITUD2G8-unsplash.jpg",
//                 "password": "12345",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "Amarama_1990",
//         "fullname": "Bob",
//             "imgUrl": "src/assets/imgs/chatsImg/craig-mckay-jmURdhtm7Ng-unsplash.jpg",
//                 "password": "12345",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "Amarama_1990",
//         "fullname": "Bob",
//             "imgUrl": "src/assets/imgs/chatsImg/ethan-hoover-0YHIlxeCuhg-unsplash.jpg",
//                 "password": "12345",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "Guenna",
//         "password": "12345",
//             "fullname": "Guenna Barns",
//                 "imgUrl": "src/assets/imgs/chatsImg/houcine-ncib-B4TjXnI0Y2c-unsplash.jpg",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "Shalom",
//         "password": "12345",
//             "fullname": "Shalom Rahamim",
//                 "imgUrl": "src/assets/imgs/chatsImg/jonas-kakaroto-mjRwhvqEC0U-unsplash.jpg",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "Sugen",
//         "password": "12345",
//             "fullname": "Sugen Kyoto",
//                 "imgUrl": "src/assets/imgs/chatsImg/joseph-pearson-827XUhVSp8M-unsplash.jpg",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "_id": "u101414",
//         "username": "Merry",
//             "password": "12345",
//                 "fullname": "Merry Brons",
//                     "imgUrl": "src/assets/imgs/chatsImg/karl-magnuson-85J99sGggnw-unsplash.jpg",
//                         "bio": "Traveling and sharing my life! Folow me to see more!",
//                             "following": [
//                                 {
//                                     "_id": "u106",
//                                     "fullname": "Dob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u100",
//                                     "fullname": "Rob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "followers": [
//                                     {
//                                         "_id": "u115",
//                                         "fullname": "Mob",
//                                         "imgUrl": "http://some-img"
//                                     },
//                                     {
//                                         "_id": "u125",
//                                         "fullname": "Gob",
//                                         "imgUrl": "http://some-img"
//                                     },
//                                     {
//                                         "_id": "u135",
//                                         "fullname": "Fob",
//                                         "imgUrl": "http://some-img"
//                                     }
//                                 ],
//                                     "savedStoryIds": [
//                                         "s104",
//                                         "s111",
//                                         "s123"
//                                     ]
// },
// {
//     "username": "Elio",
//         "password": "12345",
//             "fullname": "Elio Vasquez",
//                 "imgUrl": "src/assets/imgs/chatsImg/kelly-sikkema-JN0SUcTOig0-unsplash.jpg",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "Spring",
//         "password": "12345",
//             "fullname": "Spirng Hollow",
//                 "imgUrl": "src/assets/imgs/chatsImg/matheus-ferrero-pg_WCHWSdT8-unsplash.jpg",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "Durma",
//         "password": "12345",
//             "fullname": "Durma Babylon",
//                 "imgUrl": "src/assets/imgs/chatsImg/mubariz-mehdizadeh-t3zrEm88ehc-unsplash.jpg",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "Eliya",
//         "password": "12345",
//             "fullname": "Eliya Photos",
//                 "imgUrl": "src/assets/imgs/chatsImg/noah-silliman-gzhyKEo_cbU-unsplash.jpg",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "Sunset",
//         "password": "12345",
//             "fullname": "Sunset Grace",
//                 "imgUrl": "src/assets/imgs/chatsImg/pablo-heimplatz-EAvS-4KnGrk-unsplash.jpg",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "Shlomo_Vintage_Photography",
//         "password": "12345",
//             "fullname": "Shlomo Hagoel",
//                 "imgUrl": "src/assets/imgs/chatsImg/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "Loram",
//         "password": "12345",
//             "fullname": "Lora Mallark",
//                 "imgUrl": "src/assets/imgs/chatsImg/stefan-stefancik-QXevDflbl8A-unsplash.jpg",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "AliYo",
//         "password": "12345",
//             "fullname": "Ali Yossef",
//                 "imgUrl": "src/assets/imgs/chatsImg/tegan-mierle-ioyEITUD2G8-unsplash.jpg",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },
// {
//     "username": "Gracie_I",
//         "password": "12345",
//             "fullname": "Gracie Illinovitz",
//                 "imgUrl": "src/assets/imgs/chatsImg/christopher-campbell-rDEOVtE7vOs-unsplash.jpg",
//                     "bio": "Traveling and sharing my life! Folow me to see more!",
//                         "following": [
//                             {
//                                 "_id": "u106",
//                                 "fullname": "Dob",
//                                 "imgUrl": "http://some-img"
//                             },
//                             {
//                                 "_id": "u100",
//                                 "fullname": "Rob",
//                                 "imgUrl": "http://some-img"
//                             }
//                         ],
//                             "followers": [
//                                 {
//                                     "_id": "u115",
//                                     "fullname": "Mob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u125",
//                                     "fullname": "Gob",
//                                     "imgUrl": "http://some-img"
//                                 },
//                                 {
//                                     "_id": "u135",
//                                     "fullname": "Fob",
//                                     "imgUrl": "http://some-img"
//                                 }
//                             ],
//                                 "savedStoryIds": [
//                                     "s104",
//                                     "s111",
//                                     "s123"
//                                 ]
// },


