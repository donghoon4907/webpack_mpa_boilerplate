import actions from "./actions";
import mutations from "./mutations";
import Store from "./store";

const initialState: any = {
    user: {
        data: [],
        total: 0,
        page: 1,
        limit: 10
    },
    post: {
        data: [],
        total: 0,
        page: 1,
        limit: 10
    }
};

export default new Store({
    actions,
    mutations,
    initialState
});
