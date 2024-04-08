export function ActionList({ onRemoveStory, story }) {
    return (
        <ul>
            <button onClick={() => onRemoveStory(story)}>Remove</button>
            <button>Edit</button>
        </ul>
    )
}