import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import EmojiPicker from 'emoji-picker-react';
import Slider from "react-slick";

import { TxtInput } from "./TxtInput.jsx";
import { Actions } from "./Actions.jsx";
import { ActionListModal } from "./ActionListModal.jsx";

import { storyService } from "../services/story.service.local.js"
import { userService } from "../services/user.service.js";
import { updateStory } from "../store/story.actions.js";

export function StoryDetails() {
    const [story, setStory] = useState(null)
    const [comment, setComment] = useState({ txt: '' })
    const [like, setLike] = useState('')
    const [save, setSave] = useState('')
    const [showPicker, setShowPicker] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false)

    const user = useSelector((storeState) => storeState.userModule.loggedinUser)
    const stories = useSelector((storeState) => storeState.storyModule.stories)
    const params = useParams()
    const navigate = useNavigate()

    // console.log(story, story.comments)


    useEffect(() => {
        loadStory()
    }, [])

    function onClose() {
        navigate(-1)
    }

    function loadStory() {
        console.log(params)
        storyService.getById(params.storyId)
            .then((story) => {
                setStory(story)
            })
            .catch((err) => {
                console.log('Had issues in story details', err)
                navigate('/')
            })
    }

    function goToProfile(username) {
        navigate(`/${username}`)
    }

    async function addStoryComment(ev) {
        ev.preventDefault()
        const newComment = storyService.addStoryCmt(comment.txt, user)
        story.comments.push(newComment)
        await storyService.save(story)

        setComment({ txt: '' })
    }

    function removeComment(commId) {
        const idx = story.comments.findIndex(comment => comment.id === commId)
        if (story.comments[idx].by._id !== user._id) return
        story.comments.splice(idx, 1)
        updateStory(story)
        setStory(prevStory => {
            return { ...prevStory, comments: story.comments }
        })
    }

    function checkLike() {
        console.log(user)
        return story.likedBy.some(likedUser => likedUser._id === user._id)
    }

    function toggleLike() {
        if (checkLike()) {
            const idx = story.likedBy.findIndex(likedUser => likedUser._id === user._id)
            story.likedBy.splice(idx, 1)
        }

        else {
            story.likedBy.push({
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                imgUrl: user.imgUrl
            })
        }
        storyService.save(story)
        setLike(checkLike())
    }

    function checkSave() {
        return user.savedStoryIds.some(id => id === story._id)
    }

    function toggleSave() {
        if (checkSave()) {
            const idx = user.savedStoryIds.findIndex(id => id === story._id)
            user.savedStoryIds.splice(idx, 1)
        }

        else user.savedStoryIds.push(story._id)
        userService.update(user)
        setSave(checkSave())
    }


    const onEmojiClick = (emojiObject, event) => {
        setComment({ txt: comment.txt + emojiObject.emoji })
        setShowPicker(false)
    }

    if (!story) return <div className="loading-page"><span className="loading"></span></div>
    return <div className="story-details">
        <div className="app">
            <div className="app">


                <div className="picker-container">
                    {showPicker && <EmojiPicker
                        pickerStyle={{ width: '100%' }}
                        onEmojiClick={onEmojiClick} />}
                </div>
            </div>
        </div>
        <section className="story-container">
            <div className="story-list">
                {stories.map((story) => (


                    <div className="details-comment">
                        <div>
                            <section className="details-header">
                                <div>
                                    <img className="prew-user-img" src={story.by.imgUrl} />
                                    <a className="details-username"
                                    // onClick={() => goToProfile(story.by.username)}
                                    >{story.by.username} </a>
                                </div>
                                <button onClick={onClose}><i className="fa-solid fa-x"></i></button>
                            </section>
                            <section className="comments-container">
                                <div className="comments-list">
                                    <section className="comment">
                                        <img className="prew-user-img" src={story.by.imgUrl}
                                        // onClick={() => goToProfile(story.by.username)}
                                        />
                                        <div>
                                            <section>
                                                <span className="details-username"

                                                // onClick={() => goToProfile(story.by.username)}

                                                >{story.by.username}</span>
                                                <span className="story-text">&nbsp;{story.txt}</span>
                                            </section>
                                            <section className="comment-footer">
                                                <span className="time">1h</span>
                                                <button onClick={() => setIsListOpen(!isListOpen)}
                                                ><i className="fa-solid fa-ellipsis"></i> {isListOpen &&
                                                    <ActionListModal
                                                        onRemoveStory={onRemoveStory}
                                                        story={story}
                                                    />}
                                                </button>
                                            </section>
                                        </div>
                                    </section>
                                    {story.comments && story.comments.length ?
                                        <Fragment>
                                            {story.comments.map(comment => <section className="comment" key={comment.id}>
                                                {/* <img className="prew-user-img" src={comment.by.imgUrl}

                                                // onClick={() => goToProfile(comment.by.username)}

                                                /> */}
                                                <div>
                                                    <section>
                                                        <span className="details-username"
                                                        //  onClick={() => goToProfile(comment.by.username)}
                                                        >
                                                            {/* {comment.by.username} */}
                                                        </span>
                                                        <span className="story-text">&nbsp;{comment.txt}</span>
                                                    </section>
                                                    <section className="comment-footer">
                                                        <span className="time">1h</span>
                                                        <button onClick={() => setIsListOpen(!isListOpen)}
                                                        ><i className="fa-solid fa-ellipsis"></i> {isListOpen &&
                                                            <ActionListModal
                                                                onRemoveStory={onRemoveStory}
                                                                story={story}
                                                            />}
                                                        </button>
                                                    </section>
                                                </div>
                                            </section>)}
                                        </Fragment> : null}
                                </div>
                                <div className="footer-container">
                                    <Actions
                                        story={story}
                                        toggleLike={toggleLike}
                                        checkLike={checkLike}
                                        checkSave={checkSave} toggleSave={toggleSave} />
                                    <div className="likes-time">
                                        <a>{story.likedBy.length} likes</a>
                                        <span>1 HOUR AGO</span>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="input-section">
                            <EmojiPicker height={200} width={200} />
                            <span onClick={() => setShowPicker(val => !val)}><i className="fa-regular fa-face-smile"></i></span>
                            <TxtInput comment={comment} setComment={setComment} addStoryComment={addStoryComment} />
                            <a className={comment.txt ? 'activated' : 'none'} onClick={addStoryComment}>Post</a>
                        </div>
                    </div>
                ))}


            </div>
        </section>

    </div>
}
