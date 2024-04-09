import { Link } from "react-router-dom";

export function Actions({ story, likesIsOpen, toggleLike, checkLike }) {
    return (
        <div className="btn-container">
            <a
            // onClick={toggleLike}
            >
                <i
                    //  className={checkLike() ? "fa-solid fa-heart" : 
                    className="fa-regular fa-heart"></i></a>
            <Link to={`${story._id}`}><i className="fa-regular fa-comment"></i></Link>
            <a><i className="fa-regular fa-paper-plane"></i></a>
            <a

                // onClick={toggleSave} 

                className="saved-btn"><i

                    // className={checkSave() ? "fa-solid fa-bookmark" : 

                    className="fa-regular fa-bookmark"></i></a>
        </div>

    )
}