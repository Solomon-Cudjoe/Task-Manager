import { SET_USER, SET_TASKS, SET_AUTHENTICATED } from "./constants";

const initialState = {
    user: null,
    authenticated: false,
    tasks: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: action.payload
            }
        case SET_TASKS:
            return {
                ...state,
                tasks: action.payload
            }
        default:
            return state
    }
}