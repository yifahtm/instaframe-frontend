/* eslint-disable no-unused-vars */
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
import { getActionUpdateStory, updateStory, updateStoryAfterCommenting } from "../store/story.actions.js";
import { storyServiceHttp } from './../services/story.service';

export function StoryDetails() {
    const [story, setStory] = useState(null)
    // const [img, setImg] = useState('')
    const [comment, setComment] = useState({ txt: '' })
    const [like, setLike] = useState('')
    const [save, setSave] = useState('')
    const [showPicker, setShowPicker] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false)

    const user = useSelector((storeState) => storeState.userModule.loggedinUser)
    const params = useParams()

    const navigate = useNavigate()
    let imagesLocationStart = '../../'




    useEffect(() => {
        loadStory()
        // setImg(story.imgUrls[0])
    }, [])

    function onClose() {
        navigate(-1)
    }

    function loadStory() {
        storyServiceHttp.getById(params.storyId)
            .then((story) => {
                setStory(story)
                console.log(story)
                console.log(params.storyId)
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
        // console.log("The story you want is here:" + await storyServiceHttp.getById(story._id))
        // console.log(story._id)
        // console.log(comment)
        const newComment = await storyServiceHttp.addStoryMsg(story._id, comment.txt, user)
        // console.log(newComment)

        story.comments.push(newComment.cmt)
        // await storyServiceHttp.save(story)
        // story.comments.push(comment)
        updateStoryAfterCommenting(story)
        console.log(story)
        setStory(story)

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

    async function onRemoveStory(story) {
        try {
            await removeStoryOptimistic(story._id)
            showSuccessMsg('Story removed')
        } catch (err) {
            console.log('Cannot remove story', err)
            showErrorMsg('Cannot remove story')
        }
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
            <div className="picker-container">
                {showPicker && <EmojiPicker
                    pickerStyle={{ width: '100%' }}
                    onEmojiClick={onEmojiClick} />}
            </div>
        </div>

        <section className="story-container">
            <div className="image">
                {/* {story.imgUrls.length > 1 ?
                    // <Slider className="slick-slider" dots={true} infinite={false}>
                    story.imgUrls.map(img => <img key={story.imgUrls} className="story-img" src={img} />)
                    // </Slider>
                    :  */}
                {story.imgUrls[0].startsWith('http') ?
                    <img className="story-img" src={story.imgUrls[0]} alt="story-img" /> :
                    <img className="story-img" src={imagesLocationStart + story.imgUrls[0]} alt="story-img" />}
                {/* } */}
            </div>


            <div className="details-comment">
                <div>
                    <section className="details-header">
                        <div>
                            <img className="prew-user-img" src={story.by.imgUrl} />
                            <a className="details-username"
                                onClick={() => goToProfile(story.by.username)}
                            >
                                {story.by.username}
                            </a>
                        </div>
                        <button onClick={() => setIsListOpen(!isListOpen)}
                        ><i className="fa-solid fa-ellipsis"></i> {isListOpen &&
                            <ActionListModal
                                onRemoveStory={onRemoveStory}
                                story={story}
                                isListOpen={isListOpen}
                                setIsListOpen={setIsListOpen}
                            />}
                        </button>
                        <button className="btn-close" onClick={onClose}><i className="fa-solid fa-x"></i></button>
                    </section>
                    <section className="comments-container">
                        <div className="comments-list">
                            <section className="comment">
                                <img className="prew-user-img" src={story.by.imgUrl}
                                    onClick={() => goToProfile(story.by.username)}
                                />
                                <div>
                                    <section>
                                        <span className="details-username"

                                            onClick={() => goToProfile(story.by.username)}

                                        >
                                            {story.by.username}
                                        </span>
                                        <span className="story-text">&nbsp;{story.txt}</span>
                                    </section>
                                    {/* <section className="comment-footer">
                                                <span className="time">1h</span>
                                                <button onClick={() => setIsListOpen(!isListOpen)}
                                                ><i className="fa-solid fa-ellipsis"></i> {isListOpen &&
                                                    <ActionListModal
                                                        onRemoveStory={onRemoveStory}
                                                        story={story}
                                                    />}
                                                </button>
                                            </section> */}
                                </div>
                            </section>
                            {story.comments && story.comments.length ?
                                <Fragment>
                                    {story.comments.map(comment => <section className="comment" key={comment.id}>
                                        <img className="prew-user-img" src={comment.by?.imgUrl}

                                            onClick={() => goToProfile(comment.by.username)}

                                        />
                                        <div>
                                            <section>
                                                <span className="details-username"
                                                    onClick={() => goToProfile(comment.by.username)}
                                                >
                                                    {comment.by?.username}
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
                <div className="input-section flex space-between">
                    {/* <EmojiPicker height={200} width={200} />
                    <span onClick={() => setShowPicker(val => !val)}><i className="fa-regular fa-face-smile"></i></span> */}
                    <i className="fa-regular fa-face-smile"></i>

                    <TxtInput comment={comment} setComment={setComment} addStoryComment={addStoryComment} />
                    <a className={comment.txt ? 'activated' : 'none'} onClick={addStoryComment}>Post</a>

                </div>
            </div>
            {/* ))} */}


            {/* </div> */}
        </section>

    </div>
}
