import actions from "./actions.js";
import mutations from "./mutations.js";
import Store from "./store.js";

const initialState = {
    items: ["I made this", "Another thing"]
};

export default new Store({
    actions,
    mutations,
    initialState
});
