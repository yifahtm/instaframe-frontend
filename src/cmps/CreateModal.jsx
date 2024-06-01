import { useState } from "react"
import { useSelector } from 'react-redux'
// import { FileUploader } from "react-drag-drop-files"

import { ImgUploader } from "./ImgUploader.jsx"

import { storyService } from "../services/story.service.local.js"
import { toggleModal } from "../store/system.actions.js"
import { addStory } from "../store/story.actions.js"
import { TxtInput } from "./TxtInput.jsx"

export function CreateModal() {
    const [createStory, setCreateStory] = useState(storyService.getEmptyStory())
    const user = useSelector((storeState) => storeState.userModule.watchedUser)

    const fileTypes = ["JPEG", "PNG", "GIF"]

    const [file, setFile] = useState(null)
    const fileHandleChange = (file) => {
        setFile(file)
    }

    function onUploadSuccess(imgUrl) {
        console.log("🚀 ~ onUploadSuccess ~ imgUrl:", imgUrl)
        setCreateStory(prevState => ({ ...prevState, imgUrls: [...prevState.imgUrls, imgUrl] }))
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        setCreateStory(prevStory => ({ ...prevStory, [field]: value }))
    }

    function onSaveStory(ev) {
        ev.preventDefault()
        console.log("🚀 ~ onSaveStory ~ createStory:", createStory)
        if (!createStory.imgUrls.length) {
            console.log('no ages')
            return
        }
        addStory(createStory).then(() => {
            toggleModal()
            // window.location.reload(false)
        })
    }

    function goToProfile() {
        navigate('/:id')
    }

    function onModal(ev) {
        ev.stopPropagation()
    }

    return (
        <div className='create-modal' onClick={toggleModal}>
            <button><i className="fa-solid fa-xmark btn-close"></i></button>
            <div className='create-story' onClick={onModal}>
                <header>
                    <a onClick={toggleModal}><i className="fa-solid fa-arrow-left"></i></a>
                    <span>Create new story</span>
                    <a className='share-btn' onClick={onSaveStory}>Share</a>
                </header>
                <div className='create-story-container'>
                    <section className='img-section'>
                        {createStory.imgUrls.length ? <img src={createStory.imgUrls} /> :
                            <ImgUploader onUploadSuccess={onUploadSuccess} />}
                    </section>
                    <section className='story-info'>
                        <form onSubmit={onSaveStory}>
                            <div className='suggestion-user-info'>
                                <img className='suggestion-photo' src={user.imgUrl}
                                    onClick={goToProfile}
                                />
                                <div className='suggestion-user-name'>
                                    <a
                                        onClick={goToProfile}
                                    >{user.username}</a>
                                </div>
                            </div>
                            <div className="text-area">
                                <label htmlFor="text"></label>

                                <textarea type="text"
                                    name="txt"
                                    id="txt"
                                    placeholder="Write a caption..."
                                    value={createStory.txt}
                                    onChange={handleChange}
                                />
                                <i className="fa-regular fa-face-smile"></i>
                            </div>
                            <div className="btns-extra">
                                <div className='input-container other location flex space-between' >
                                    <input className='other location' type="text" placeholder="Add location"></input>
                                    <span className="icon flex justify-center align-center material-symbols-outlined">
                                        location_on
                                    </span>
                                </div>
                                <div className='input-container other accessability flex space-between' >
                                    {/* <label htmlFor="accessability" className='other accessability' ></label> */}
                                    <input id="accessability"
                                        // style={{ visibility: "hidden" }}

                                        className='other accessability' type="text" placeholder="Accessability"></input><i className=" icon flex justify-center align-center  fa-solid fa-chevron-down"></i>
                                </div>
                                <div className='input-container other advanced flex space-between'>
                                    {/* <label htmlFor="advanced" className='other advanced' ></label> */}
                                    <input id="advanced" className='other advanced'
                                        // style={{ visibility: "hidden" }} 
                                        type="text" placeholder="Advanced settings"></input><i className="icon flex justify-center align-center  fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
                <span>{createStory.txt.length}/2,200</span>


            </div >
        </div >
    )

}


