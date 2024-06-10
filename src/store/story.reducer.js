// export const SET_STORIES = 'SET_STORIES'
// export const REMOVE_STORY = 'REMOVE_STORY'
// export const ADD_STORY = 'ADD_STORY'
// export const UPDATE_STORY = 'UPDATE_STORY'
// export const ADD_TO_STORYT = 'ADD_TO_STORYT'
// export const CLEAR_STORYT = 'CLEAR_STORYT'
// export const UNDO_REMOVE_STORY = 'UNDO_REMOVE_STORY'
// export const REMOVE_FROM_STORYT = 'REMOVE_FROM_STORYT'

// const initialState = {
//     stories: [],
//     storyt: [],
//     lastRemovedStory: null
// }

// export function storyReducer(state = initialState, action) {
//     var newState = state
//     var stories
//     var storyt
//     switch (action.type) {
//         case SET_STORIES:
//             newState = { ...state, stories: action.stories }
//             break
//         case REMOVE_STORY:
//             const lastRemovedStory = state.stories.find(story => story._id === action.storyId)
//             stories = state.stories.filter(story => story._id !== action.storyId)
//             newState = { ...state, stories, lastRemovedStory }
//             break
//         case ADD_STORY:
//             newState = { ...state, stories: [...state.stories, action.story] }
//             break
//         case UPDATE_STORY:
//             stories = state.stories.map(story => (story._id === action.story._id) ? action.story : story)
//             newState = { ...state, stories }
//             break
//         case ADD_TO_STORYT:
//             newState = { ...state, storyt: [...state.storyt, action.story] }
//             break
//         case REMOVE_FROM_STORYT:
//             storyt = state.storyt.filter(story => story._id !== action.storyId)
//             newState = { ...state, storyt }
//             break
//         case CLEAR_STORYT:
//             newState = { ...state, storyt: [] }
//             break
//         case UNDO_REMOVE_STORY:
//             if (state.lastRemovedStory) {
//                 newState = { ...state, stories: [...state.stories, state.lastRemovedStory], lastRemovedStory: null }
//             }
//             break
//         default:
//     }
//     return newState
// }

import { storyService } from "../services/story.service.local.js"

export const SET_FILTER = 'SET_FILTER'
export const SET_STORIES = 'SET_STORIES'
export const REMOVE_STORY = 'REMOVE_STORY'
export const SET_LABLES = 'SET_LABLES'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const UNDO_REMOVE_STORY = 'UNDO_REMOVE_STORY'
export const SET_IS_LOADING = 'SET_IS_LOADING'


const initialState = {
    // filterBy: storyService.getDefaultFilter(),
    isLoading: false,
    stories: [],
    lastStories: [],
    lastRemovedStory: null,
}

export function storyReducer(state = initialState, action) {
    let stories
    let lastStories
    switch (action.type) {
        case SET_STORIES:
            lastStories = [...action.stories]
            return { ...state, stories: action.stories, lastStories }
        case SET_FILTER:
            return { ...state, filterBy: { ...action.filterBy } }
        case UPDATE_STORY:

            stories = state.stories.map(story => story._id === action.story._id ? action.story : story)
            return { ...state, stories }
        case ADD_STORY:
            stories = [...state.stories, action.story]
            return { ...state, stories }
        case REMOVE_STORY:
            lastStories = [...state.stories]
            stories = state.stories.filter(story => story._id !== action.storyId)
            return { ...state, stories, lastStories }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        case UNDO_REMOVE_STORY:
            if (state.lastRemovedStory) {
                newState = { ...state, stories: [...state.stories, state.lastRemovedStory], lastRemovedStory: null }
            }
            break
        default:
            return state
    }
}


