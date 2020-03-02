import { SET_TOKEN, RESET_TOKEN } from './actions';

function tokenReducer(state = "", action) {
    switch(action.type) {
        case SET_TOKEN:
            return action.token;
        case RESET_TOKEN:
            return "";
        default:
            return state;
    }
}

export default function rootReducer(state = {}, action) {
    return {
        token: tokenReducer(state.token, action)
    }
}