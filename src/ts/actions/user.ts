/**
 * 사용자 검색
 */
export const SEARCH_USER = "searchUser";
/**
 * 사용자 목록 추가
 */
export const FETCHMORE_USER = "fetchMoreUser";

export default {
    [SEARCH_USER](context: any, payload: any) {
        context.commit(SEARCH_USER, payload);
    },
    [FETCHMORE_USER](context: any, payload: any) {
        context.commit(FETCHMORE_USER, payload);
    }
};
