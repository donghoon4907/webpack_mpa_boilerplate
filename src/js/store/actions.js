/**
 * 전역 상태 변경
 */
export const CHANGE_STATE = "CHANGE_STATE";
/**
 * 사용자 검색
 */
export const SEARCH_USER = "searchUser";
/**
 * 검색 목록 삭제
 */
export const REMOVE_SEARCH_USER = "removeSearchUser";

export default {
    searchUser(context, payload) {
        context.commit(SEARCH_USER, payload);
    },
    removeSearchUser(context, payload) {
        context.commit(REMOVE_SEARCH_USER, payload);
    }
};
