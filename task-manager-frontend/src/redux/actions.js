import axios from "axios";
import {
  SET_AUTHENTICATED,
  SET_TASKS,
  SET_USER,
  SET_CATEGORIES,
  SET_NOTIFICATIONS,
  SET_THEME,
} from "./constants";

//Setters

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setAuthenticated = (bool) => ({
  type: SET_AUTHENTICATED,
  payload: bool,
});

export const setTasks = (tasks) => ({
  type: SET_TASKS,
  payload: tasks,
});

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setNotifications = (notifications) => ({
  type: SET_NOTIFICATIONS,
  payload: notifications,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

//Authentication

export const handleSignUp = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/signUp",
        credentials
      );
      if (!response.data.error) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response.data);
      }
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};

export const handleLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/login",
        credentials,
        {
          withCredentials: true,
        }
      );
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
  };
};

export const checkAuth = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/auth/authenticate`,
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(res.data.user));
      dispatch(setAuthenticated(true));
      return Promise.resolve(res.data);
    } catch (err) {
      dispatch(setUser(null));
      dispatch(setAuthenticated(false));
      return Promise.reject(err.response.data);
    }
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/auth/forgot-password/${email}`,
        {
          withCredentials: true,
        }
      );
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};

export const resetPassword = (token, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER}/auth/reset-password/${token}`,
        { password }
      );
      if (!response.data.error) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response.data);
      }
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};

export const getVerificationToken = (email) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/auth/get-token/${email}`,
        {
          withCredentials: true,
        }
      );
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};

export const verifyUser = (token) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER}/auth/verify-user/${token}`,
        {
          withCredentials: true,
        }
      );
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};

export const editUser = (userEmail, credentials) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER}/auth/${userEmail}`,
        credentials
      );
      if (!res.data.error) {
        dispatch(checkAuth());
        return Promise.resolve(res.data);
      } else {
        return Promise.reject(res.data);
      }
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};

export const changePassword = (email, password, newPassword) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER}/auth/changePassword/${email}`,
        { password, newPassword }
      );
      if (!res.data.error) {
        dispatch(checkAuth());
        return Promise.resolve(res.data);
      } else {
        return Promise.reject(res.data);
      }
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};

export const handleLogout = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(null));
      dispatch(setAuthenticated(false));
      return Promise.resolve(response.data);
    } catch (err) {
      console.log(err);
      return Promise.reject(err.response.data);
    }
  };
};

//Tasks
export const fetchTasks = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/tasks/${userId}`
      );
      if (!response.data.error) {
        dispatch(setTasks(response.data.tasks));
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response.data);
      }
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};

export const handleTaskCreation = (userId, credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:5001/tasks/${userId}`,
        credentials
      );
      if (!response.data.error) {
        dispatch(fetchTasks(userId));
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response.data);
      }
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};

export const handleTaskEdit = (userId, taskId, credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/tasks/${userId}/${taskId}`,
        credentials
      );
      if (!response.data.error) {
        dispatch(fetchTasks(userId));
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response.data);
      }
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};

export const changeStatus = (userId, taskId) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER}/tasks/status/${userId}/${taskId}`,
        { status: "completed" }
      );
      if (!response.data.error) {
        dispatch(fetchTasks(userId));
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response.data);
      }
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};

export const onDelete = (userId, taskId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER}/tasks/${userId}/${taskId}`
      );
      if (!response.data.error) {
        dispatch(fetchTasks(userId));
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response.data);
      }
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};

//TAGS

export const getTags = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/tags`);
      if (!response.data.error) {
        dispatch(setCategories(response.data.categories));
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response.data);
      }
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};

//NOTIFICATIONS

export const getNotifications = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/notifications/${userId}`
      );
      if (!response.data.error) {
        dispatch(setNotifications(response.data.notifications));
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response.data);
      }
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};

export const readNotification = (userId, notificationId) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER}/notifications/read/${userId}/${notificationId}`
      );
      if (!response.data.error) {
        dispatch(getNotifications(userId));
      } else {
        return Promise.reject(response.data);
      }
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  };
};
