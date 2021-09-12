import React, { useReducer, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { setCurrentUser } from "./Auth.actions";

import authReducer from "./Auth.reducer";
import AuthGlobal from "./AuthGlobal";

const AuthStore = ({ children }) => {
  const [stateUser, dispatch] = useReducer(authReducer, {
    isAuthenticated: null,
    user: {},
  });
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      let jwtToken = null;
      try {
        setShowChild(true);
        jwtToken = await AsyncStorage.getItem("jwt");
        if (jwtToken) {
          const decoded = jwtToken ? jwtToken : "";
          if (setShowChild && decoded) {
            dispatch(setCurrentUser(jwtDecode(decoded)));
          }
        }
      } catch (e) {
        // error reading value
      }
    }, 1000);

    return () => setShowChild(false);
  }, []);

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          stateUser,
          dispatch,
        }}
      >
        {children}
      </AuthGlobal.Provider>
    );
  }
};

export default AuthStore;
