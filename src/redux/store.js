import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import auth from './reducers/auth';
import alert from './reducers/alerts';
import thunk from 'redux-thunk';

const store = () => {
    const instance = createStore(combineReducers({
        auth,
        alert
    }), applyMiddleware(thunk))
    return instance
}

export default store