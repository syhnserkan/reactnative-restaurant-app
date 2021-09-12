import { Platform } from "react-native";

let apiUrl = "";

{
  Platform.OS == "android"
    ? (apiUrl = "http://10.0.2.2:3000/api/v1")
    : (apiUrl = "http://localhost:3000/api/v1");
}

export default apiUrl;
