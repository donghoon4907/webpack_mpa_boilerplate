/**
 * 사용자 검색
 */
export const SEARCH_USER = "searchUser";
/**
 * 사용자 목록 추가
 */
export const FETCHMORE_USER = "fetchMoreUser";
/**
 * 포스트 검색
 */
export const SEARCH_POST = "searchPost";
/**
 * 사용자 목록 추가
 */
export const FETCHMORE_POST = "fetchMorePost";

export default {
    async [SEARCH_USER](context: any, payload: any) {
        return context.commit(SEARCH_USER, payload);
    },
    async [FETCHMORE_USER](context: any, payload: any) {
        return context.commit(FETCHMORE_USER, payload);
    },
    async [SEARCH_POST](context: any, payload: any) {
        return context.commit(SEARCH_POST, payload);
    },
    async [FETCHMORE_POST](context: any, payload: any) {
        return context.commit(FETCHMORE_POST, payload);
    }
};
