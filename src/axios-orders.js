import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-app-424aa.firebaseio.com",
});

export default instance;
