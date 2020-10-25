/**
 * 사용자 검색
 */
export const SEARCH_USER = "searchUser";
/**
 * 사용자 목록 추가 요청
 */
export const FETCHMORE_USER = "fetchMoreUser";
/**
 * 포스트 검색
 */
export const SEARCH_POST = "searchPost";
/**
 * 사용자 목록 추가 요청
 */
export const FETCHMORE_POST = "fetchMorePost";

export default {
    [SEARCH_USER](context, payload) {
        context.commit(SEARCH_USER, payload);
    },
    [FETCHMORE_USER](context, payload) {
        context.commit(FETCHMORE_USER, payload);
    },
    [SEARCH_POST](context, payload) {
        context.commit(SEARCH_POST, payload);
    },
    [FETCHMORE_POST](context, payload) {
        context.commit(FETCHMORE_POST, payload);
    }
};
