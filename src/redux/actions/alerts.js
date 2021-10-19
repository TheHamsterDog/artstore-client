import {
    v4 as uuid
} from 'uuid';
import {
    REMOVE_ALERT,
    ADD_ALERT
} from "../definitions";

export const add_alert = (type, message, dispatch) => {
    return dispatch({
        type: ADD_ALERT,
        payload: {
            id: uuid(),
            message: message,
            type: type
        }
    })
}
export const remove_alert = (id, dispatch) => {
    return dispatch({
        type: REMOVE_ALERT,
        payload: id
    })
}