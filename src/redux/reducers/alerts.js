import {
    REMOVE_ALERT,
    ADD_ALERT
} from "../definitions";

const initialState = []

const alert = (state = initialState, action) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case ADD_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            return state.filter((al) => {
                if (al.id !== payload) {
                    return al
                }
            })
        default:
            return state
    }
}

export default alert