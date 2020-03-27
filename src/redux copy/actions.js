export const SET_TOKEN = 'SET_TOKEN';
export const RESET_TOKEN = 'RESET_TOKEN';
export const SET_ID = 'SET_ID';
export const STORE_COURSES = 'STORE_COURSES';
export const REMOVE_COURSES = 'REMOVE_COURSES';
export const STORE_COLORS = 'STORE_COLORS';
export const REMOVE_COLORS = 'REMOVE_COLORS';
export const ADD_COURSE_ASSIGNMENTS = 'ADD_COURSE_ASSIGNMENTS';
export const STORE_EVENTS = 'STORE_EVENTS';
export const REMOVE_EVENTS = 'REMOVE_EVENTS';

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
        type: REMOVE_COURSES
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

export function add_course_assignments(assignments) {
    return {
        type: ADD_COURSE_ASSIGNMENTS,
        assignments
    }
}
export function store_events(events) {
    return {
        type: STORE_EVENTS,
        events
    }
}

export function remove_events(events) {
    return {
        type: REMOVE_EVENTS
    }
}
