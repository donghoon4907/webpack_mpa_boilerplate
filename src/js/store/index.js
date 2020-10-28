import actions from "./actions";
import mutations from "./mutations";
import Store from "./store";
import { TYPE_USER, TYPE_POST } from "./types";

const initialState = {
    user: {
        data: [],
        total: 0,
        type: TYPE_USER
    },
    post: {
        data: [],
        total: 0,
        type: TYPE_POST
    }
};

export default new Store({
    actions,
    mutations,
    initialState
});
