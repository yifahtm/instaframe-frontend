import { Link } from "react-router-dom";

export function Actions({ story, likesIsOpen, toggleLike, checkLike,
    toggleSave, checkSave }) {
    return (
        <div className="btn-container">
            <a
                onClick={toggleLike}
            >
                <i
                    className={checkLike() ? "fa-solid fa-heart" :
                        "fa-regular fa-heart"}></i></a>
            <Link to={`/story/${story._id}`}><i className="fa-regular fa-comment"></i></Link>
            <a><i className="fa-regular fa-paper-plane"></i></a>
            <a onClick={toggleSave} className="saved-btn"><i className={checkSave() ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i></a>
        </div>
    )
}