import axios from 'axios';
import {
    add_alert
} from './alerts';
import {
    LOAD_USER,
    LOG_OUT
} from '../definitions';
export const register = async (state, dispatch) => {
    try {
        console.log(state)
        const request = await axios.post('/api/user/sign-up', state)
        console.log(request.data);
        localStorage.setItem('token', request.data.token)
        add_alert('success', "Signed Up Successfully!", dispatch)
        axios.defaults.headers.common = {
            "x-auth-token": request.data.token
        };
        return dispatch({
            type: LOAD_USER,
            payload: {
                user: request.data.user
            }
        })
    } catch (err) {
        console.log(err)
        if (err.response.data.errors) {
            err.response.data.errors.forEach(element => {
                add_alert('error', element.message, dispatch)
            });
        }
        add_alert('error', err.response.data.error, dispatch)
    }
}

export const login = async (state, dispatch) => {
    try {
        console.log(state)
        const request = await axios.post('/api/user/sign-in', state)
        console.log(request.data);
        localStorage.setItem('token', request.data.token)
        axios.defaults.headers.common = {
            "x-auth-token": request.data.token
        };
        add_alert('success', "Signed In Successfully!", dispatch)

        return dispatch({
            type: LOAD_USER,
            payload: {
                user: request.data.user
            }

        })
    } catch (err) {
        console.log(err)
        if (err.response.data.errors) {
            err.response.data.errors.forEach(element => {
                add_alert('error', element.message, dispatch)
            });
        }
        add_alert('error', err.response.data.error, dispatch)
    }
}
export const loadUser = async (dispatch) => {
    axios.defaults.headers.common = {
        "x-auth-token": localStorage.token
    };
    try {
        const request = await axios.get('/api/user/');

        return dispatch({
            type: LOAD_USER,
            payload: {
                user: request.data.user
            }
        })


    } catch (err) {
        console.log(err)
        if (err.response.data.errors) {
            err.response.data.errors.forEach(element => {
                add_alert('error', element.message, dispatch)
            });
        }
        add_alert('error', err.response.data.error, dispatch)
        return dispatch({
            type: LOG_OUT,
            payload: {}
        })

    }
}