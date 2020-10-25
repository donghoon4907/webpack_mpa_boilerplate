import actions from "./actions";
import mutations from "./mutations";
import Store from "./store";
import { USER, POST } from "./types";

const initialState = {
    user: {
        data: [],
        total: 0,
        type: USER
    },
    post: {
        data: [],
        total: 0,
        type: POST
    }
};

export default new Store({
    actions,
    mutations,
    initialState
});
