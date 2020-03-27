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

export default function rootReducer(state = {}, action) {
    return {
        id: idReducer(state.id, action),
        courses: coursesReducer(state.courses, action),
        allAssignments: assignmentsReducer(state.allAssignments, action),
        events: eventReducer(state.events, action),
        inbox: inboxReducer(state.inbox, action)
    }
}