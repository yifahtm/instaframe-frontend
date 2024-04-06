// import { Link } from 'react-router-dom'
// import { StoryPreview } from './StoryPreview'
// import { CardStoryPreview } from './CardStoryPreview'

// export function StoryList({ stories, user, onRemoveStory }) {
//   return (
//     <section className="story">
//       <div className="story-list">
//         {stories.map((story) => (
//           <div key={story._id}>
//             <CardStoryPreview story={story} user={user} onRemoveStory={onRemoveStory} />
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }

import { Link } from 'react-router-dom'
import { StoryPreview } from './StoryPreview'
// import { CardStoryPreview } from './CardStoryPreview'

export function StoryList({ stories, user, onRemoveStory }) {
  return (
    <section className="story">
      <div className="story-list">
        {stories.map((story) => (
          <div key={story._id}>
            <StoryPreview story={story} user={user} onRemoveStory={onRemoveStory} />
          </div>
        ))}
      </div>
    </section>
  )
}
