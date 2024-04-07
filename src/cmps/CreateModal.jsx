import { useState } from "react"
import { useSelector } from 'react-redux'
// import { FileUploader } from "react-drag-drop-files"

import { ImgUploader } from "./ImgUploader.jsx"

import { storyService } from "../services/story.service.local.js"
import { toggleModal } from "../store/system.actions.js"

export function CreateModal() {
    const [createStory, setCreateStory] = useState(storyService.getEmptyStory())

    const fileTypes = ["JPEG", "PNG", "GIF"]

    const [file, setFile] = useState(null)
    const fileHandleChange = (file) => {
        setFile(file)
    }

    function onUploadSuccess(imgUrl) {
        setCreateStory(prevState => ({ ...prevState, imgUrl: [...prevState.imgUrl, imgUrl] }))
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        setCreateStory(prevStory => ({ ...prevStory, [field]: value }))
    }

    function onSaveStory(ev) {
        ev.preventDefault()
        console.log(createStory.imgUrl)
        if (!createStory.imgUrl.length) {
            console.log('dfghjk')
            return
        }
        storyService.save(createStory).then(() => {
            alert('story added')
            toggleModal()
            window.location.reload(false)
        })
    }

    function onModal(ev) {
        ev.stopPropagation()
    }

    return (
        <div className='create-modal' onClick={toggleModal}>
            <div className='create-post' onClick={onModal}>
                <header>
                    <a onClick={toggleModal}><i className="fa-solid fa-arrow-left"></i></a>
                    <span>Create new story</span>
                    <a className='share-btn' onClick={onSaveStory}>Share</a>
                </header>
                <div className='create-post-container'>
                    <section className='img-section'>
                        {createStory.imgUrl.length ? <img src={createStory.imgUrl} /> :
                            <ImgUploader onUploadSuccess={onUploadSuccess} />}
                    </section>
                    <section className='post-info'>
                        <form onSubmit={onSaveStory}>
                            <label htmlFor="text"></label>
                            <textarea type="text"
                                name="txt"
                                id="txt"
                                placeholder="Write a caption..."
                                value={createStory.txt}
                                onChange={handleChange} />
                        </form>
                    </section>
                </div>
                <span>{createStory.txt.length}/2,200</span>


            </div >
        </div >
    )

}


