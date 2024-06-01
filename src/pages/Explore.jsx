import { ExploreStoryList } from "../cmps/ExploreStoryList.jsx"
import { Outlet } from 'react-router-dom';
import { storyService } from "../services/story.service.local.js"
import { loadStories } from "../store/story.actions.js"
import { store } from "../store/store.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { LOADING_DONE, LOADING_START } from "../store/system.reducer.js"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react";

export function Explore() {
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const [filterBy, setFilterBy] = useState(storyService.getDefualtFilterBy)
    const loggedInUser = useSelector(storeState => storeState.userModule.watchedUser)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)

    useEffect(() => {
        onLoadPosts()
    }, [filterBy])

    useEffect(() => {
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, loggedInUser_id: loggedInUser._id }))
    }, [loggedInUser])

    function onLoadPosts() {
        store.dispatch({ type: LOADING_START, })
        loadStories(filterBy)
            .then(() => {
                showSuccessMsg('Stories loaded successfully')
                store.dispatch({ type: LOADING_DONE, }
                )
            })
            .catch((err) => {
                showErrorMsg('Error occured by loading stories', err)
            })

    }


    return (
        <section className="explore-page">
            <ExploreStoryList stories={stories} />
            <Outlet />
        </section>
    )
}