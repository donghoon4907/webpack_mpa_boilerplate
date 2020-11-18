import axios from "axios";
import user from "./user";
import post from "./post";

const { defaults } = axios;
defaults.baseURL = process.env.API_BASE_URL;
defaults.headers.common["app-id"] = process.env.API_APP_ID;
defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export default {
    ...user,
    ...post
};
