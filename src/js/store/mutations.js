import axios from "axios";

const { defaults } = axios;
defaults.baseURL = "https://dummyapi.io/data/api/";
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

            state.users = data;
            state.total = total;
        } catch (e) {
            console.error(e);
        }

        return state;
    },
    removeSearchUser(state, payload) {
        state.list.splice(payload.index, 1);

        return state;
    }
};
