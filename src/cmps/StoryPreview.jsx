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
import { useState, useEffect } from 'react'

import { ActionList } from "./ActionList.jsx";

export function StoryPreview({ story, user, onRemoveStory }) {
    const [isListOpen, setIsListOpen] = useState(false)


    // async function onRemoveStory(story) {
    //     if (story.by._id !== user._id) return
    //     try {
    //         await removeStory(story._id)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
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
                ><i class="fa-solid fa-ellipsis"></i> {isListOpen && <ActionList
                    onRemoveStory={onRemoveStory}
                    story={story}
                />}
                </button>
            </section>
            <img className="story-img" src={imgUrl} alt="story"></img>
            {/* <h1>{txt}</h1> */}
            <section className="story-footer">
                <div className="btn-container">
                    <a

                    // onClick={toggleLike}

                    >

                        <i

                            //  className={checkLike() ? "fa-solid fa-heart" : 

                            className="fa-regular fa-heart"></i></a>
                    <Link to={`${story._id}`}><span><i className="fa-regular fa-comment"></i></span></Link>
                    <a><i className="fa-regular fa-paper-plane"></i></a>
                    <a

                        // onClick={toggleSave} 

                        className="saved-btn"><i

                            // className={checkSave() ? "fa-solid fa-bookmark" : 

                            className="fa-regular fa-bookmark"></i></a>
                </div>
                {likedBy.length ? <section> <img src={likedBy[0].imgUrl} /><span>Liked by</span> <Link to={likedBy[0].username} className="story-user-name link">{likedBy[0].username}</Link> {likedBy.length > 1 && <div><span>and </span>

                    {/* <a onClick={() => likesIsOpen(likedBy)} className="story-likes">{likedBy.length - 1} others</a> */}

                </div>}</section> : null}

                <div><Link to={story.by.username} className="story-user-name link">{story.by.username}</Link> <span className="story-text">{txt}</span></div>
                {comments.length > 2 && <Link className="link" to={`/${story._id}`}><span className="story-comments-view"> View all {comments.length} comments </span></Link>}
                {comments.length > 1 ? <a className="story-comment"><span className="story-user-name">{comments[comments.length - 2].by.username}</span> <span className="story-text">{comments[comments.length - 2].txt}</span></a> : null}
                {comments.length ? <a className="story-comment"><span className="story-user-name">{comments[comments.length - 1].by.username}</span> <span className="story-text">{comments[comments.length - 1].txt}</span></a> : null}
                {/* <MsgForm comment={comment} setComment={setComment} addStoryComment={addStoryComment} /> */}
            </section>

        </section>
    )
}