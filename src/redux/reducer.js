import {
    REQUEST_COURSES,
    RECEIVE_COURSES,
    REQUEST_ASSIGNMENTS,
    RECEIVE_ASSIGNMENTS,
    REQUEST_EVENTS,
    RECEIVE_EVENTS,
    REQUEST_INBOX,
    RECEIVE_INBOX
} from './actions';

function idReducer(state = "", action) {
    switch(action.type) {
        default:
            return state;
    }
}

function coursesReducer(state = { isFetching: false, items: [] }, action) {
    switch(action.type) {
        case REQUEST_COURSES:
            return {
                isFetching: true,
            }
        case RECEIVE_COURSES:
            return {
                isFetching: false,
                items: action.courses
            }
        default:
            return state;
    }
}

function assignmentsReducer(state = [], action) {
    switch(action.type) {
        default:
            return state;
    }
}

function eventsReducer(state = [], action) {
    switch(action.type) {
        default:
            return state;
    }
}

function inboxReducer(state = [], action) {
    switch(action.type) {
        default:
            return state;
    }
}

export default function rootReducer(state = {}, action) {
    return {
        id: idReducer(state.id, action),
        courses: coursesReducer(state.courses, action),
        allAssignments: assignmentsReducer(state.allAssignments, action),
        events: eventsReducer(state.events, action),
        inbox: inboxReducer(state.inbox, action)
    }
}