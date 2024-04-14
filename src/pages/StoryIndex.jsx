
import { useDispatch, useSelector } from 'react-redux'
import { Fragment, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'


import { Shorts } from '../cmps/Shorts.jsx'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import {
    loadStories,
    removeStoryOptimistic,
    // setFilter
} from '../store/story.actions.js'
import { loadUsers } from '../store/user.actions';

import { StoryList } from '../cmps/StoryList.jsx'
import { LoginSignup } from '../cmps/LoginSignup.jsx';
import { LikesModal } from '../cmps/LikesModal.jsx';
// import { StoryFilter } from '../cmps/StoryFilter.jsx'

export function StoryIndex() {
    const stories = useSelector((storeState) => storeState.storyModule.stories)
    const isLoading = useSelector((storeState) => storeState.storyModule.isLoading)
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)
    // const filterBy = useSelector((storeState) => storeState.storyModule.filterBy)
    const [likes, likesIsOpen] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (stories.length && user) return
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

    function goToProfile() {
        navigate('/:username')
    }

    // if (stories.length && !user) return <LoginSignup />

    return (
        <>
            <Shorts />
            <div className="nested-route">
                <Outlet />
            </div>
            <div className="story-container">
                <main className="main-container">
                    {/* <section className="filter-container"> */}

                    {/* } */}
                    {/* <StoryFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
                    {/* </section> */}

                    {!isLoading && (
                        <StoryList stories={stories}
                            user={user}
                            onRemoveStory={onRemoveStory}
                            likesIsOpen={likesIsOpen}
                            likes={likes} />
                    )}
                    {isLoading && <div>Loading...</div>}
                </main>
            </div>
        </>
    )
}
