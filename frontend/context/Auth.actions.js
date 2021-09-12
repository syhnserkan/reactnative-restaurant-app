import jwtDecode from "jwt-decode";
import Toast from "react-native-toast-message";
import apiUrl from "../connection/apiUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
  fetch(`${apiUrl}/users/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      if (data) {
        try {
          const token = JSON.stringify(data.token);
          await AsyncStorage.setItem("jwt", token);
          const decoded = jwtDecode(token);
          dispatch(setCurrentUser(decoded, user));
          console.log(data);
        } catch (e) {
          // saving error
          console.log("error", e);
        }
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((err) => {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please provide correct credentials",
        text2: "",
      });
      //Todo
      logoutUser(dispatch);
    });
};

export const getUserProfile = (id) => {
  fetch(`${apiUrl}/users/${id}`, {
    method: "GET",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
