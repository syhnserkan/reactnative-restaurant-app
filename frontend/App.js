import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";

//Routes
import Main from "./routes/Main";

//Screens

//Components
import Navbar from "./components/Navbar";

//Store
import { Provider } from "react-redux";
import store from "./store/store";

//Context
import AuthStore from "./context/AuthStore";

//for ignore errors
LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <AuthStore>
      <Provider store={store}>
        <NavigationContainer>
          <Navbar />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
          <StatusBar style="auto" />
        </NavigationContainer>
      </Provider>
    </AuthStore>
  );
}
