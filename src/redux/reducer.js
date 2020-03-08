import { SET_TOKEN, RESET_TOKEN, SET_ID } from './actions';

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

function idReducer(state = 0, action) {
    switch(action.type) {
        case SET_ID:
            return action.id;
        default:
            return state;
    }
}

export default function rootReducer(state = {}, action) {
    return {
        token: tokenReducer(state.token, action),
        id: idReducer(state.id, action) 
    }
}