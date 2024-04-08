// import { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { loadStories, addStory, updateStory, removeStory, addToStoryt } from '../store/story.actions.js'
// import { StoryList } from '../cmps/StoryList.jsx'
// import { Link } from 'react-router-dom'

// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { userService } from '../services/user.service.js'
// import { storieservice } from '../services/story.service.js'

// export function StoryIndex() {

//     const stories = useSelector(storeState => storeState.storyModule.stories)

//     useEffect(() => {
//         loadStories()
//     }, [])

//     async function onRemoveStory(storyId) {
//         try {
//             await removeStory(storyId)
//             showSuccessMsg('Story removed')
//         } catch (err) {
//             showErrorMsg('Cannot remove story')
//         }
//     }

//     async function onAddStory() {
//         const story = storieservice.getEmptyStory()
//         story.vendor = prompt('Vendor?')
//         try {
//             const savedStory = await addStory(story)
//             showSuccessMsg(`Story added (id: ${savedStory._id})`)
//         } catch (err) {
//             showErrorMsg('Cannot add story')
//         }
//     }

//     async function onUpdateStory(story) {
//         const price = +prompt('New price?')
//         const storyToSave = { ...story, price }
//         try {
//             const savedStory = await updateStory(storyToSave)
//             showSuccessMsg(`Story updated, new price: ${savedStory.price}`)
//         } catch (err) {
//             showErrorMsg('Cannot update story')
//         }
//     }

//     function onAddToStoryt(story) {
//         console.log(`Adding ${story.vendor} to Storyt`)
//         addToStoryt(story)
//         showSuccessMsg('Added to Storyt')
//     }

//     function onAddStoryMsg(story) {
//         console.log(`TODO Adding msg to story`)
//         try {
//             showSuccessMsg(`Story msg added, it now has: ${3}`)
//         } catch (err) {
//             showErrorMsg('Cannot update story')
//         }

//     }

//     function shouldShowActionBtns(story) {
//         const user = userService.getLoggedinUser()
//         if (!user) return false
//         if (user.isAdmin) return true
//         return story.owner?._id === user._id
//     }

//     return (
//         <div>
//             <h3>Stories App</h3>
//             <main>
//                 <button onClick={onAddStory}>Add Story ⛐</button>
//                 <StoryList></StoryList>
//                 <ul className="story-list">
//                     {stories.map(story =>
//                         <li className="story-preview" key={story._id}>
//                             <h4>{story.vendor}</h4>
//                             <h1>⛐</h1>
//                             <p>Price: <span>${story.price.toLocaleString()}</span></p>
//                             <p>Owner: <span>{story.owner && story.owner.fullname}</span></p>
//                             {shouldShowActionBtns(story) && <div>
//                                 <button onClick={() => { onRemoveStory(story._id) }}>x</button>
//                                 <button onClick={() => { onUpdateStory(story) }}>Edit</button>
//                             </div>}

//                             <button onClick={() => { onAddStoryMsg(story) }}>Add story msg</button>
//                             <button className="buy" onClick={() => { onAddToStoryt(story) }}>Add to storyt</button>
//                         </li>)
//                     }
//                 </ul>
//             </main>
//         </div>
//     )
// }

import { useDispatch, useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { Fragment, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import {
    loadStories,
    removeStoryOptimistic,
    // setFilter
} from '../store/story.actions.js'
import { loadUsers } from '../store/user.actions';

import { StoryList } from '../cmps/StoryList.jsx'
import { LoginSignup } from '../cmps/LoginSignup.jsx';
// import { StoryFilter } from '../cmps/StoryFilter.jsx'

export function StoryIndex() {
    const stories = useSelector((storeState) => storeState.storyModule.stories)
    // const filterBy = useSelector((storeState) => storeState.storyModule.filterBy)
    const isLoading = useSelector((storeState) => storeState.storyModule.isLoading)
    const navigate = useNavigate()
    // const user = useSelector((storeState) => storeState.userModule.loggedinUser)

    useEffect(() => {
        // if (stories.length && user) return
        loadStories()
        loadUsers()
    }, [])

    async function onRemoveStory(story) {
        try {
            await removeStoryOptimistic(story._id)
            showSuccessMsg('Story removed')
        } catch (err) {
            console.log('Cannot remove story', err)
            showErrorMsg('Cannot remove story')
        }
    }

    function onSetFilter(filterBy) {
        setFilter(filterBy)
    }

    // if (stories.length && !user) return <LoginSignup />

    return (
        <div className="story-container">
            <main className="main-container">
                <section className="filter-container">

                    {/* } */}
                    {/* <StoryFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
                </section>
                {!isLoading && (
                    <StoryList stories={stories}
                        //  user={user} 
                        onRemoveStory={onRemoveStory} />
                )}
                {isLoading && <div>Loading...</div>}
            </main>
        </div>
    )
}
