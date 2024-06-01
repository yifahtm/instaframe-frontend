import { StoryPreview } from "./StoryPreview"

export function ExploreStoryList({ stories }) {

    return (
        <section className="explore-story-list">
            {stories.map(story => <div key={story._id} onClick={() => storyModal(story)} className='story-preview'>
                <section className='story-info'>
                    <div className='likes-comm'>
                        <div>
                            <i className="fa-solid fa-heart"></i>
                            <span>{story.likedBy.length}</span>
                        </div>
                        <div>
                            <i className="fa-solid fa-comment"></i>
                            <span>{story.comments.length}</span>
                        </div>
                    </div>
                </section>
                <img key={story.imgUrl} src={story.imgUrls[0]} /></div>)}
        </section>
    )
}