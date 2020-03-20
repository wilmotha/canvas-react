import { 
    SET_TOKEN, RESET_TOKEN, 
    SET_ID, 
    STORE_COURSES, REMOVE_COURSES,
    ADD_COURSE_ASSIGNMENTS,
    STORE_COLORS, REMOVE_COLORS,
    STORE_EVENTS, REMOVE_EVENTS
} from './actions';

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

// set timer for this to be reset
function coursesReducer(state = [], action) {
    switch (action.type) {
        case STORE_COURSES:
            return action.courses;
        case REMOVE_COURSES:
            return [];
        default:
            return state;
    }
}

function colorsReducer(state = {}, action) {
    switch (action.type) {
        case STORE_COLORS:
            return action.colors;
        case REMOVE_COLORS:
        case REMOVE_COURSES:
            return {};
        default:   
            return state;
    }
}

function assignmentsReducer(state = [], action) {
    console.log("CLEAR: ", action.type);
    console.log("NOOO: ", state);
    switch (action.type) {
        case ADD_COURSE_ASSIGNMENTS:
            return [
                ...state,
                action.assignments
            ];
        case REMOVE_COURSES:
            return [];
        default:
            return state;
    }
}

function eventReducer(state = [], action) {
    switch (action.type) {
        case STORE_EVENTS:
            return action.events;
        case REMOVE_COURSES:
        case REMOVE_EVENTS:
            return [];
        default:
            return state;
    }
}

export default function rootReducer(state = {}, action) {
    return {
        token: tokenReducer(state.token, action),
        id: idReducer(state.id, action),
        courses: coursesReducer(state.courses, action),
        colors: colorsReducer(state.colors, action),
        allAssignments: assignmentsReducer(state.allAssignments, action),
        events: eventReducer(state.events, action)
    }
}