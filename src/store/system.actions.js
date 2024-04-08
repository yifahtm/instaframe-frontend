import { storyService } from "../services/story.service.local.js";
// import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { TOGGLE_MODAL } from "./system.reducer.js";

export function toggleModal() {
    store.dispatch({
        type: TOGGLE_MODAL
    })
}