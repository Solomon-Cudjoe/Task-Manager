import { SET_USER, SET_TOKEN, SET_TASKS } from "./constants";

const initialState = {
    user: null,
    token: null,
    tasks: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
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