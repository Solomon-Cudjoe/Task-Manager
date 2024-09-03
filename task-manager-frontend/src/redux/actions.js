import axios from "axios";
import { SET_TOKEN, SET_USER } from "./constants";

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
})

export const setToken = (token) => ({
    type: SET_TOKEN,
    payload: token
})


export const handleSignUp = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("/http://localhost:5000/auth/signUp", credentials);
            if (!response.data.error) {
                return Promise.resolve(response.data);
            } else {
                return Promise.reject(response.data);
            }
        } catch (err) {
            return Promise.reject(err.response.data);
        }
    }
}

export const handleLogin = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("/http://localhost:5000/auth/login", credentials);
            if (!response.data.error) {
                dispatch(setUser(response.data.user));
                dispatch(setToken(response.data.token));
                return Promise.resolve(response.data);
            } else {
                return Promise.reject(response.data);
            }
        } catch (err) {
            return Promise.reject(err.response.data);
        }
    }
}