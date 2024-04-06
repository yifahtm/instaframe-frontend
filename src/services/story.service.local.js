
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    getEmptyStory,
    addStoryCmt
}
window.ss = storyService

async function query(filterBy = { txt: '', price: 0 }) {
    const stories = await storageService.query(STORAGE_KEY)
    if (!stories || !stories.length) _createStories()
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     stories = stories.filter(story => regex.test(story.vendor) || regex.test(story.description))
    // }
    // if (filterBy.price) {
    //     stories = stories.filter(story => story.price <= filterBy.price)
    // }
    return storageService.query(STORAGE_KEY)
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
    let savedStory
    if (story._id) {
        savedStory = await storageService.put(STORAGE_KEY, story)
    } else {
        // Later, owner is set by the backend
        story.owner = userService.getLoggedinUser()
        savedStory = await storageService.post(STORAGE_KEY, story)
    }
    return savedStory
}

async function addStoryCmt(storyId, cmt) {
    const updatedStory = await storageService.get(STORAGE_KEY, storyId)
    //   const updatedStory = await getById(storyId)
    updatedStory.comments.push(cmt)
    save(updatedStory)
    return storageService.post(STORAGE_KEY)
}

function getEmptyStory() {
    return {
        // _id: "",
        txt: "",
        imgUrl: [],
        comments: [],
        likedBy: [],
        by: {
            _id: "",
            username: "",
            fullname: "",
            imgUrl: ""
        },
    }
}



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))


function _createStories() {
    const story = [{
        '_id': 'smnox',
        'txt': 'Exhibition curated by @giulioaprin presents a spectrum of aerial photographers that push themselves into finding unusual and different point of view bringing us extraordinary facets of our reality.',
        'imgUrl': ['https://picsum.photos/seed/picbxyvh/200/300',
            'https://picsum.photos/seed/picwwajt/200/300',
            'https://picsum.photos/seed/picgo8m7/200/300'],
        'by': {
            '_id': 'uv4k3',
            'fullname': 'Cameron Davis',
            'username': 'SlowCat79',
            'imgUrl': 'https://picsum.photos/seed/picfn9fz/200/300'
        },
        'comments': [{
            'id': 'ct1e9',
            'by': {
                '_id': 'uarpe',
                'username': 'HappyFox33',
                'fullname': 'Riley Brown',
                'imgUrl': 'https://picsum.photos/seed/pic6ba7j/200/300'
            },
            'txt': 'Amazing shot, really captures the moment.',
            'likedBy': [{
                '_id': 'uf07z',
                'username': 'SmallLion27',
                'fullname': 'Avery Jones',
                'imgUrl': 'https://picsum.photos/seed/pica30z6/200/300'
            }]
        },
        {
            'id': 'cnfro',
            'by': {
                '_id': 'uisqp',
                'username': 'BigLion69',
                'fullname': 'Avery Moore',
                'imgUrl': 'https://picsum.photos/seed/pico88xi/200/300'
            },
            'txt': 'Breathtaking view from above.',
            'likedBy': [{
                '_id': 'uyhn0',
                'username': 'BrightDog82',
                'fullname': 'Jamie Smith',
                'imgUrl': 'https://picsum.photos/seed/pickm3de/200/300'
            }]
        },
        {
            'id': 'c1p1s',
            'by': {
                '_id': 'uwm1p',
                'username': 'BrightWolf24',
                'fullname': 'Avery Johnson',
                'imgUrl': 'https://picsum.photos/seed/picb24aj/200/300'
            },
            'txt': 'Such a unique angle!',
            'likedBy': [{
                '_id': 'usdrm',
                'username': 'SmallDog63',
                'fullname': 'Avery Davis',
                'imgUrl': 'https://picsum.photos/seed/picvth7r/200/300'
            }]
        }],
        'likedBy': [{
            '_id': 'uwfiv',
            'fullname': 'Sam Smith',
            'username': 'BrightTiger77',
            'imgUrl': 'https://picsum.photos/seed/picheirp/200/300'
        }]
    },
    {
        '_id': 'sdeci',
        'txt': 'Exhibition curated by @giulioaprin presents a spectrum of aerial photographers that push themselves into finding unusual and different point of view bringing us extraordinary facets of our reality.',
        'imgUrl': ['https://picsum.photos/seed/piclanld/200/300',
            'https://picsum.photos/seed/picv35in/200/300',
            'https://picsum.photos/seed/pic5hr0n/200/300'],
        'by': {
            '_id': 'ua33l',
            'fullname': 'Jordan Taylor',
            'username': 'CalmFish45',
            'imgUrl': 'https://picsum.photos/seed/piceheut/200/300'
        },
        'comments': [{
            'id': 'c29p8',
            'by': {
                '_id': 'uwv7v',
                'username': 'DarkFox41',
                'fullname': 'Sam Taylor',
                'imgUrl': 'https://picsum.photos/seed/pic2hj2y/200/300'
            },
            'txt': 'Such a unique angle!',
            'likedBy': [{
                '_id': 'uld1s',
                'username': 'BigFish96',
                'fullname': 'Avery Taylor',
                'imgUrl': 'https://picsum.photos/seed/piclzd9u/200/300'
            }]
        }],
        'likedBy': [{
            '_id': 'uxect',
            'fullname': 'Cameron Davis',
            'username': 'SadTiger54',
            'imgUrl': 'https://picsum.photos/seed/picw12zs/200/300'
        }]
    },
    {
        '_id': 's6ny3',
        'txt': 'Exhibition curated by @giulioaprin presents a spectrum of aerial photographers that push themselves into finding unusual and different point of view bringing us extraordinary facets of our reality.',
        'imgUrl': ['https://picsum.photos/seed/picd8sol/200/300',
            'https://picsum.photos/seed/picz4cqw/200/300',
            'https://picsum.photos/seed/picef1aq/200/300'],
        'by': {
            '_id': 'umft7',
            'fullname': 'Taylor Smith',
            'username': 'AngryBear58',
            'imgUrl': 'https://picsum.photos/seed/picvmf41/200/300'
        },
        'comments': [{
            'id': 'c580l',
            'by': {
                '_id': 'u5ayj',
                'username': 'SadCat78',
                'fullname': 'Jamie Brown',
                'imgUrl': 'https://picsum.photos/seed/pic89een/200/300'
            },
            'txt': 'This really shows the beauty of our world.',
            'likedBy': [{
                '_id': 'ukzkb',
                'username': 'BrightWolf74',
                'fullname': 'Morgan Brown',
                'imgUrl': 'https://picsum.photos/seed/pic1d86g/200/300'
            }]
        },
        {
            'id': 'cbheo',
            'by': {
                '_id': 'uiu1g',
                'username': 'DarkBear37',
                'fullname': 'Taylor Johnson',
                'imgUrl': 'https://picsum.photos/seed/picr7aaz/200/300'
            },
            'txt': 'Breathtaking view from above.',
            'likedBy': [{
                '_id': 'u8jq3',
                'username': 'HappyFox59',
                'fullname': 'Casey Davis',
                'imgUrl': 'https://picsum.photos/seed/picgul6y/200/300'
            }]
        }],
        'likedBy': [{
            '_id': 'uqt4c',
            'fullname': 'Sam Davis',
            'username': 'BigShark91',
            'imgUrl': 'https://picsum.photos/seed/picbtaqt/200/300'
        },
        {
            '_id': 'uybo3',
            'fullname': 'Riley Smith',
            'username': 'CalmBird61',
            'imgUrl': 'https://picsum.photos/seed/pic51e2p/200/300'
        },
        {
            '_id': 'uq0c7',
            'fullname': 'Avery Davis',
            'username': 'AngryTiger10',
            'imgUrl': 'https://picsum.photos/seed/picau62j/200/300'
        }]
    },
    {
        '_id': 'sy9xh',
        'txt': 'Exhibition curated by @giulioaprin presents a spectrum of aerial photographers that push themselves into finding unusual and different point of view bringing us extraordinary facets of our reality.',
        'imgUrl': ['https://picsum.photos/seed/picnlf4n/200/300',
            'https://picsum.photos/seed/pic29hom/200/300',
            'https://picsum.photos/seed/pic3mvan/200/300'],
        'by': {
            '_id': 'uhth1',
            'fullname': 'Jordan Moore',
            'username': 'AngryBird45',
            'imgUrl': 'https://picsum.photos/seed/pic57gu2/200/300'
        },
        'comments': [{
            'id': 'c2ymd',
            'by': {
                '_id': 'u3asw',
                'username': 'DarkWolf26',
                'fullname': 'Casey Taylor',
                'imgUrl': 'https://picsum.photos/seed/pic6lia6/200/300'
            },
            'txt': 'Breathtaking view from above.',
            'likedBy': [{
                '_id': 'unx1h',
                'username': 'SlowBear45',
                'fullname': 'Avery Miller',
                'imgUrl': 'https://picsum.photos/seed/picy2v68/200/300'
            }]
        },
        {
            'id': 'citjb',
            'by': {
                '_id': 'uhbj8',
                'username': 'SlowDog87',
                'fullname': 'Casey Smith',
                'imgUrl': 'https://picsum.photos/seed/picnz8wq/200/300'
            },
            'txt': 'The composition here is fantastic.',
            'likedBy': [{
                '_id': 'uydd7',
                'username': 'HappyDog16',
                'fullname': 'Avery Brown',
                'imgUrl': 'https://picsum.photos/seed/picrremr/200/300'
            }]
        }],
        'likedBy': [{
            '_id': 'uzncb',
            'fullname': 'Taylor Miller',
            'username': 'SlowBear13',
            'imgUrl': 'https://picsum.photos/seed/piclh84g/200/300'
        },
        {
            '_id': 'u3fc5',
            'fullname': 'Sam Johnson',
            'username': 'SadBear41',
            'imgUrl': 'https://picsum.photos/seed/pic06499/200/300'
        },
        {
            '_id': 'uyxix',
            'fullname': 'Sam Miller',
            'username': 'SmallShark71',
            'imgUrl': 'https://picsum.photos/seed/pic2sudm/200/300'
        }]
    },
    {
        '_id': 'snejt',
        'txt': 'Exhibition curated by @giulioaprin presents a spectrum of aerial photographers that push themselves into finding unusual and different point of view bringing us extraordinary facets of our reality.',
        'imgUrl': ['https://picsum.photos/seed/picqi21l/200/300',
            'https://picsum.photos/seed/pic9gzcj/200/300',
            'https://picsum.photos/seed/picm3vyo/200/300'],
        'by': {
            '_id': 'uh9v4',
            'fullname': 'Riley Johnson',
            'username': 'HappyFox72',
            'imgUrl': 'https://picsum.photos/seed/picuojyl/200/300'
        },
        'comments': [{
            'id': 'ch4rl',
            'by': {
                '_id': 'ut336',
                'username': 'BigFox83',
                'fullname': 'Jordan Brown',
                'imgUrl': 'https://picsum.photos/seed/picdhobv/200/300'
            },
            'txt': 'This really shows the beauty of our world.',
            'likedBy': [{
                '_id': 'u00k9',
                'username': 'FastCat66',
                'fullname': 'Casey Johnson',
                'imgUrl': 'https://picsum.photos/seed/picm3bxz/200/300'
            }]
        }],
        'likedBy': [{
            '_id': 'umurx',
            'fullname': 'Avery Davis',
            'username': 'BigFox66',
            'imgUrl': 'https://picsum.photos/seed/pic89srn/200/300'
        }]
    },
    {
        '_id': 'sjnb0',
        'txt': 'Exhibition curated by @giulioaprin presents a spectrum of aerial photographers that push themselves into finding unusual and different point of view bringing us extraordinary facets of our reality.',
        'imgUrl': ['https://picsum.photos/seed/picsnwd3/200/300',
            'https://picsum.photos/seed/pic4ved9/200/300',
            'https://picsum.photos/seed/pic0qnxx/200/300'],
        'by': {
            '_id': 'up918',
            'fullname': 'Cameron Smith',
            'username': 'FastFish95',
            'imgUrl': 'https://picsum.photos/seed/picux8zl/200/300'
        },
        'comments': [{
            'id': 'cld9p',
            'by': {
                '_id': 'u39ad',
                'username': 'DarkBear81',
                'fullname': 'Jamie Brown',
                'imgUrl': 'https://picsum.photos/seed/picw71zy/200/300'
            },
            'txt': 'The composition here is fantastic.',
            'likedBy': [{
                '_id': 'uc7t5',
                'username': 'BigCat35',
                'fullname': 'Cameron Miller',
                'imgUrl': 'https://picsum.photos/seed/pict5b6s/200/300'
            }]
        },
        {
            'id': 'c3s3b',
            'by': {
                '_id': 'utoq2',
                'username': 'CalmShark18',
                'fullname': 'Casey Davis',
                'imgUrl': 'https://picsum.photos/seed/picw07i3/200/300'
            },
            'txt': 'Amazing shot, really captures the moment.',
            'likedBy': [{
                '_id': 'ucorm',
                'username': 'AngryBear62',
                'fullname': 'Casey Johnson',
                'imgUrl': 'https://picsum.photos/seed/pic8ill5/200/300'
            }]
        }],
        'likedBy': [{
            '_id': 'uzr8q',
            'fullname': 'Riley Smith',
            'username': 'CalmBear65',
            'imgUrl': 'https://picsum.photos/seed/pic11h12/200/300'
        }]
    }]

    storageService._save(STORAGE_KEY, story)
}

