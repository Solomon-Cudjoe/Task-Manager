import axios from "axios";
import { SET_AUTHENTICATED, SET_TASKS, SET_USER } from "./constants";


//Setters

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
})

export const setAuthenticated = (bool) => ({
    type: SET_AUTHENTICATED,
    payload: bool
})

export const setTasks = (tasks) => ({
    type: SET_TASKS,
    payload: tasks
})



//Authentication

export const handleSignUp = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("/http://localhost:5001/auth/signUp", credentials);
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
            const response = await axios
                .post("http://localhost:5001/auth/login", credentials, {
                    withCredentials: true
                })
            if (!response.data.error) {
                dispatch(setUser(response.data.user));
                dispatch(setAuthenticated(true));
                return Promise.resolve(response.data);
            } else {
                return Promise.reject(response.data);
            }
        } catch (err) {
            return Promise.reject(err.response.data);
        }
    }
}

export const checkAuth = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER}/auth/authenticate`, {
                withCredentials: true
            });
            dispatch(setUser(res.data.user));
            dispatch(setAuthenticated(true));
        } catch (err) {
            dispatch(setUser(null));
            dispatch(setAuthenticated(false));
        }
    }
}

export const handleLogout = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/auth/logout`, {
                withCredentials: true
            })
            dispatch(setUser(null));
            dispatch(setAuthenticated(false));
            return Promise.resolve(response.data);
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }
}


//Tasks
export const fetchTasks = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/tasks/${userId}`)
            if (!response.data.error) {
                dispatch(setTasks(response.data.tasks));
                return Promise.resolve(response.data);
            } else {
                return Promise.reject(response.data.error);
            }
        } catch (err) {
            return Promise.reject(err.response.data.error);
        }
    }
}