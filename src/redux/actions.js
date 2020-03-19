export const SET_TOKEN = 'SET_TOKEN';
export const RESET_TOKEN = 'RESET_TOKEN';
export const SET_ID = 'SET_ID';
export const STORE_COURSES = 'STORE_COURSES';
export const REMOVE_COURSES = 'REMOVE_COURSES';
export const STORE_COLORS = 'STORE_COLORS';
export const REMOVE_COLORS = 'REMOVE_COLORS';

export function set_token(token) {
    return {
        type: SET_TOKEN,
        token
    }
}

export function reset_token() {
    return {
        type: RESET_TOKEN,
        token: 0
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

export function store_courses(courses) {
    return {
        type: STORE_COURSES,
        courses
    }
}

export function remove_courses() {
    return {
        type: STORE_COURSES
    }
}

export function store_colors(colors) {
    return {
        type: STORE_COLORS,
        colors
    }
}

export function remove_colors() {
    return {
        type: REMOVE_COLORS
    }
}
