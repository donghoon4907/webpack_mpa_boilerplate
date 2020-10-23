import actions from "./actions.js";
import mutations from "./mutations.js";
import Store from "./store.js";

const initialState = {
    users: [],
    usersTotal: 0
};

export default new Store({
    actions,
    mutations,
    initialState
});
