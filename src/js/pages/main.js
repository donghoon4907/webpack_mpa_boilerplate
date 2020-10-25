"use strict";

import "../../sass/index.scss";
import store from "../store";
import { SEARCH_USER } from "../store/actions";
import { USER } from "../store/types";
import UserList from "../components/user_list";
// import PostList from "../components/post_list";
import MoreBtn from "../components/more_btn";

/**
 * 메인 페이지 컴포넌트
 *
 * @property {object} state     - local state management
 * @property {object} selector  - used selectors in page
 * @property {object} users     - user list component instance
 * @property {object} posts     - post list component instance
 */
class MainPage {
    constructor() {
        this.selector = {};

        this.state = {
            user: {
                limit: 10,
                page: 1
            },
            post: {
                limit: 10,
                page: 1
            }
        };

        this.users = new UserList();
        this.userMoreBtn = new MoreBtn({ type: USER, page: this.state.user.page, limit: this.state.user.limit });
        // this.posts = new PostList();

        this.bindEvent();

        store.dispatch(SEARCH_USER, this.state.user);
    }

    /**
     * bind events
     *
     */
    bindEvent() {
        let self = this;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    new MainPage();
});
