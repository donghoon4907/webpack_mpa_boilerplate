import axios from "axios";

const { defaults } = axios;
defaults.baseURL = process.env.API_BASE_URL;
defaults.headers.common["app-id"] = process.env.API_APP_ID;
defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export default {
    async searchUser(state, payload) {
        try {
            const {
                data: { data, total }
            } = await axios.get("user", {
                params: payload
            });

            state.user = {
                ...state.user,
                data,
                total
            };
        } catch (e) {
            console.error(e);
        }

        return state;
    },
    async fetchMoreUser(state, payload) {
        try {
            const {
                data: { data }
            } = await axios.get("user", {
                params: payload
            });

            state.user = {
                ...state.user,
                data: state.user.data.concat(data)
            };
        } catch (e) {
            console.error(e);
        }

        return state;
    },
    async searchPost(state, payload) {
        try {
            const {
                data: { data, total }
            } = await axios.get("post", {
                params: payload
            });

            state.post = {
                ...state.post,
                data,
                total
            };
        } catch (e) {
            console.error(e);
        }

        return state;
    },
    async fetchMorePost(state, payload) {
        try {
            const {
                data: { data }
            } = await axios.get("post", {
                params: payload
            });

            state.post = {
                ...state.post,
                data: state.post.data.concat(data)
            };
        } catch (e) {
            console.error(e);
        }

        return state;
    }
};
