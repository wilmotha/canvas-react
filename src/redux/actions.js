export const SET_TOKEN = 'SET_TOKEN';
export const RESET_TOKEN = 'RESET_TOKEN';
export const SET_ID = 'SET_ID';

export function set_token(token) {
    return {
        type: SET_TOKEN,
        token
    }
}

export function reset_token() {
    return {
        type: RESET_TOKEN,
        token: ""
    }
}

export function set_id(id) {
    return {
        type: SET_ID,
        id
    }
}

export function remove_id() {
    return {
        type: SET_ID,
        id: ""
    }
}