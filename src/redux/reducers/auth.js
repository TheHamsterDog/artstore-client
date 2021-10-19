import {
    LOAD_USER,
    LOG_OUT
} from '../definitions'

const initialState = {
    user: {},
    loaded: false
}

const auth = (state = initialState, action) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case LOAD_USER:
            return Object.assign({}, state, {
                user: payload.user,
                loaded: true
            })
        case LOG_OUT:
            return Object.assign({}, state, {
                user: {},
                loaded: false
            })
        default:
            return state
    }
}

export default auth