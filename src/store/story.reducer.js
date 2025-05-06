export const SET_STORYS = 'SET_STORYS'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const ADD_TO_STORYT = 'ADD_TO_STORYT'
export const CLEAR_STORYT = 'CLEAR_STORYT'
export const UNDO_REMOVE_STORY = 'UNDO_REMOVE_STORY'
export const REMOVE_FROM_STORYT = 'REMOVE_FROM_STORYT'

const initialState = {
    storys: [],
    storyt: [],
    lastRemovedStory: null
}

export function storyReducer(state = initialState, action) {
    var newState = state
    var storys
    var storyt
    switch (action.type) {
        case SET_STORYS:
            newState = { ...state, storys: action.storys }
            break
        case REMOVE_STORY:
            const lastRemovedStory = state.storys.find(story => story._id === action.storyId)
            storys = state.storys.filter(story => story._id !== action.storyId)
            newState = { ...state, storys, lastRemovedStory }
            break
        case ADD_STORY:
            newState = { ...state, storys: [...state.storys, action.story] }
            break
        case UPDATE_STORY:
            storys = state.storys.map(story => (story._id === action.story._id) ? action.story : story)
            newState = { ...state, storys }
            break
        case ADD_TO_STORYT:
            newState = { ...state, storyt: [...state.storyt, action.story] }
            break
        case REMOVE_FROM_STORYT:
            storyt = state.storyt.filter(story => story._id !== action.storyId)
            newState = { ...state, storyt }
            break
        case CLEAR_STORYT:
            newState = { ...state, storyt: [] }
            break
        case UNDO_REMOVE_STORY:
            if (state.lastRemovedStory) {
                newState = { ...state, storys: [...state.storys, state.lastRemovedStory], lastRemovedStory: null }
            }
            break
        default:
    }
    return newState
}
