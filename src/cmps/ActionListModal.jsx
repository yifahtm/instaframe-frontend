export function ActionListModal({ onRemoveStory, story }) {
    return (
        <section className="action-list-modal">
            <ul className="action-list clean-list">
                <li><button className="btn delete" onClick={() => onRemoveStory(story)}>Delete</button></li>
                <li><button className="btn edit" >Edit</button></li>
                <li><button className="btn cancel" onClick={() => setIsListOpen(!isListOpen)}>Cancel</button></li>
            </ul>
        </section>
    )
}