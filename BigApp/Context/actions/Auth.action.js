import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from "jwt-decode";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
    fetch(`http://10.0.2.2:3005/api/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                const token = data.token;
                AsyncStorage.setItem('jwt', token)
                const decoded = jwt_decode(token)
                dispatch(setCurrentUser(decoded, user))
            } else {
                logoutUser(dispatch);
            }
        })
        .catch((err) => {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please provide correct credentials",
                text2: ""
            });
            logoutUser(dispatch);
        })
    console.log(user);
};

export const getUserProfile = (id) => {
    fetch(`http://10.0.2.2:3005/api/user/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
        .then((res) => res.json())
    // .then((data) => console.log(data))
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        getUserProfile: user
    }
}