/////////////////////////////////////////////////
//                 COURSES                     //
/////////////////////////////////////////////////
export const REQUEST_COURSES = 'REQUEST_COURSES';
export function request_courses() {
    return {
        type: REQUEST_COURSES
    }
}

export const RECEIVE_COURSES = 'REQUEST_COURSES';
export function receive_courses(courses) {
    return {
        type: REQUEST_COURSES,
        courses
    }
}

/////////////////////////////////////////////////
//               ASSIGNMENTS                   //
/////////////////////////////////////////////////
export const REQUEST_ASSIGNMENTS = 'REQUEST_ASSIGNMENTS';
export function request_assignments() {
    return {
        type: REQUEST_ASSIGNMENTS
    }
}

export const RECEIVE_ASSIGNMENTS = 'REQUEST_ASSIGNMENTS';
export function receive_assignments(assignments) {
    return {
        type: REQUEST_ASSIGNMENTS,
        assignments
    }
}

/////////////////////////////////////////////////
//                 EVENTS                      //
/////////////////////////////////////////////////
export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export function request_inbox() {
    return {
        type: REQUEST_EVENTS
    }
}

export const RECEIVE_EVENTS = 'REQUEST_EVENTS';
export function receive_events(events) {
    return {
        type: REQUEST_EVENTS,
        events
    }
}

/////////////////////////////////////////////////
//                   INBOX                     //
/////////////////////////////////////////////////
export const REQUEST_INBOX = 'REQUEST_INBOX';
export function request_inbox() {
    return {
        type: REQUEST_INBOX
    }
}

export const RECEIVE_INBOX = 'REQUEST_INBOX';
export function receive_inbox(inbox) {
    return {
        type: REQUEST_INBOX,
        inbox
    }
}

/////////////////////////////////////////////////
//               ASSIGNMENTS                   //
/////////////////////////////////////////////////
export const CLEAR = 'CLEAR';
export function clear() {
    return {
        type: CLEAR
    }
}