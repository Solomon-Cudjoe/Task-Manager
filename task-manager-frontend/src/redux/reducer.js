import { SET_USER, SET_TASKS, SET_AUTHENTICATED, SET_CATEGORIES, SET_NOTIFICATIONS } from "./constants";

const initialState = {
    user: null,
    authenticated: false,
    tasks: [],
    categories: [],
    notifications: [],
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
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            }
        default:
            return state
    }
}