import { http, receive } from "../lib/http";

type FetchPostPayload = {
    limit?: number;
    page?: number;
};

export default {
    async searchPost(state: any, payload: FetchPostPayload = {}) {
        if (!payload.limit) {
            payload.limit = state.user.limit;
        }

        if (!payload.page) {
            payload.page = 1;
        }

        const res = await http("get", "post", payload);

        const { data, total } = receive(res);

        state.post = {
            ...payload,
            data,
            total
        };

        return Object.assign({}, state);
    },
    async fetchMorePost(state: any) {
        const page = state.post.page + 1;

        const res = await http("get", "post", { limit: state.post.limit, page });

        const { data } = receive(res);

        state.post = {
            ...state.post,
            page,
            data: state.post.data.concat(data)
        };

        return Object.assign({}, state);
    }
};
