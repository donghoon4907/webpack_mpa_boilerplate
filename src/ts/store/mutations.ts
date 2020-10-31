const axios = require("axios");

const { defaults } = axios;
defaults.baseURL = process.env.API_BASE_URL;
defaults.headers.common["app-id"] = process.env.API_APP_ID;
defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export default {
    async searchUser(state: any, payload: any = {}) {
        try {
            const {
                data: { data, total }
            } = await axios.get("user", {
                params: {
                    ...payload,
                    limit: state.user.limit
                }
            });

            state.user = {
                ...state.user,
                ...payload,
                data,
                total
            };
        } catch (e) {
            console.error(e);
        }

        return state;
    },
    async fetchMoreUser(state: any) {
        try {
            const page = state.user.page + 1;

            const {
                data: { data }
            } = await axios.get("user", {
                params: {
                    page,
                    limit: state.user.limit
                }
            });

            state.user = {
                ...state.user,
                page,
                data: state.user.data.concat(data)
            };
        } catch (e) {
            console.error(e);
        }

        return state;
    },
    async searchPost(state: any, payload: any = {}) {
        try {
            const {
                data: { data, total }
            } = await axios.get("post", {
                params: {
                    ...payload,
                    limit: state.post.limit
                }
            });

            state.post = {
                ...state.post,
                ...payload,
                data,
                total
            };
        } catch (e) {
            console.error(e);
        }

        return state;
    },
    async fetchMorePost(state: any) {
        try {
            const page = state.post.page + 1;

            const {
                data: { data }
            } = await axios.get("post", {
                params: {
                    page,
                    limit: state.post.limit
                }
            });

            state.post = {
                ...state.post,
                page,
                data: state.post.data.concat(data)
            };
        } catch (e) {
            console.error(e);
        }

        return state;
    }
};
