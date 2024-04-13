// import { Link } from "react-router-dom";
// import { uploadImg } from "../services/cloudinary-service.js"
// import { useEffect } from 'react'

// export function StoryPreview({ story }) {
//     useEffect(() => {
//         stuff()
//         console.log('stam mashu')
//     }, [])
//     async function stuff() {
//         const img = await uploadImg()
//         console.log(img)
//     }


//     const { name, inStock, price } = story
//     return (
//         <section className="story-detail-preview">
//             <img src={uploadImg} alt="story"></img>
//             <h1>{name}</h1>
//             <h3>{price}$</h3>
//             <h3>{(inStock) ? 'In stock' : 'Not in stock'}</h3>
//         </section>
//     )
// }


import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react'

import { removeStoryOptimistic } from "../store/story.actions.js";

import { ActionList } from "./ActionList.jsx";
import { Actions } from "./Actions.jsx";
import { LikesModal } from "./LikesModal.jsx";
import { TxtInput } from "./TxtInput.jsx";

import { storyService } from "../services/story.service.local.js";
import { userService } from "../services/user.service.js";

export function StoryPreview({ story, user, onRemoveStory, likesIsOpen, likes }) {
    const [isListOpen, setIsListOpen] = useState(false)
    const [like, setLike] = useState('')
    const [comment, setComment] = useState({ txt: '' })
    const [save, setSave] = useState('')
    // const user = useSelector(storeState => storeState.userModule.loggedInUser)

    function checkLike() {
        return likedBy.some(likedUser => likedUser._id === user._id)
    }

    function toggleLike() {
        if (checkLike()) {
            const idx = likedBy.findIndex(likedUser => likedUser._id === user._id)
            likedBy.splice(idx, 1)
        }

        else {
            likedBy.push({
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

    async function addStoryComment(ev) {
        ev.preventDefault()
        const newComment = storyService.addStoryCmt(comment.txt, user)
        story.comments.push(newComment)
        await storyService.save(story)

        setComment({ txt: '' })
    }

    const { imgUrl, txt, likedBy, comments } = story
    return (
        <section className="story-preview">
            <section className="story-header">
                <div className="header-info">
                    <img className="prew-user-img" src={story.by.imgUrl} />
                    <Link to={story.by.username} className="story-user-name link">{story.by.username}</Link>
                    <div className="time">
                        <span>•</span>
                        <time>1h</time>
                    </div>
                </div>
                <button onClick={() => setIsListOpen(!isListOpen)}
                ><i className="fa-solid fa-ellipsis"></i> {isListOpen &&
                    <ActionList
                        onRemoveStory={onRemoveStory}
                        story={story}
                    />}
                </button>
            </section>
            <img className="story-img" src={imgUrl} alt="story"></img>
            <section className="story-footer">
                <div>
                    <Actions
                        story={story}
                        likesIsOpen={likesIsOpen}
                        toggleLike={toggleLike}
                        checkLike={checkLike}
                        toggleSave={toggleSave}
                        checkSave={checkSave}
                    />
                </div>
                {/* {likedBy.length ? <section> <img src={likedBy[0].imgUrl} /><span>Liked by</span> <Link to={likedBy[0].username} className="story-user-name link">{likedBy[0].username}</Link> {likedBy.length > 1 && <div><span>and </span>

                    <a onClick={() => likesIsOpen(likedBy)} className="story-likes">{likedBy.length - 1} others</a>

                </div>}</section> : null} */}
                {likedBy.length &&
                    <>
                        <div className="likes-preview">
                            <span>{likedBy.length} {likedBy.length > 1 ? 'Likes' : 'Like'}</span>
                        </div>
                        {/* <LikesModal likesIsOpen={likesIsOpen} likes={likes} /> */}
                    </>
                }


                <div><Link to={story.by.username} className="story-user-name link">{story.by.username}</Link> <span className="story-text">{txt}</span></div>
                {/* {comments.length > 1 ? <a className="story-comment"><span className="story-user-name">{comments[comments.length - 2].by.username}</span> <span className="story-text">{comments[comments.length - 2].txt}</span></a> : null} */}
                {/* {comments.length ? <a className="story-comment"><span className="story-user-name">{comments[comments.length - 1].by.username}</span> <span className="story-text">{comments[comments.length - 1].txt}</span></a> : null} */}

                {comments.length > 0 &&
                    <Link className="link" to={`/story/${story._id}`}>
                        <span className="story-comments-view">
                            View {comments.length > 1 ? 'all' : ''} {comments.length} {comments.length > 1 ? 'comments' : 'comment'}
                        </span>
                    </Link>}

                <TxtInput comment={comment} setComment={setComment} addStoryComment={addStoryComment} />
            </section>

        </section>
    )
}