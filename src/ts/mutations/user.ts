import { http, receive } from "../libs/http";

type FetchUserPayload = {
    limit?: number;
    page?: number;
};

export default {
    async searchUser(state: any, payload: FetchUserPayload = {}) {
        if (!payload.limit) {
            payload.limit = state.user.limit;
        }

        if (!payload.page) {
            payload.page = 1;
        }

        const res = await http("get", "user", payload);

        const { data, total } = receive(res);

        state.user = {
            ...payload,
            data,
            total
        };

        return Object.assign({}, state);
    },
    async fetchMoreUser(state: any) {
        const page = state.user.page + 1;

        const res = await http("get", "user", { limit: state.user.limit, page });

        const { data } = receive(res);

        state.user = {
            ...state.user,
            page,
            data: state.user.data.concat(data)
        };

        return Object.assign({}, state);
    }
};
