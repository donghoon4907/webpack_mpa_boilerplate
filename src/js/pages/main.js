"use strict";

import "../../sass/index.scss";
import store from "../store";
import { SEARCH_USER, SEARCH_POST } from "../store/actions";
import UserList from "../components/user_list";
import PostList from "../components/post_list";
import UserMoreBtn from "../components/user_more_btn";
import PostMoreBtn from "../components/post_more_btn";

/**
 * 메인 페이지 컴포넌트
 *
 * @property {object} state         - local state management
 * @property {object} selector      - used selectors in page
 * @property {object} users         - user list component instance
 * @property {object} posts         - post list component instance
 * @property {object} userMoreBtn   - user list more btn
 * @property {object} postMoreBtn   - post list more btn
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

        const { user, post } = this.state;

        this.users = new UserList();

        this.userMoreBtn = new UserMoreBtn({
            page: user.page,
            limit: user.limit,
            loader: () => this.users.showSkeleton()
        });

        this.posts = new PostList();

        this.postMoreBtn = new PostMoreBtn({
            page: post.page,
            limit: post.limit,
            loader: () => this.posts.showSkeleton()
        });

        this.bindEvent();

        this.users.showSkeleton();
        this.posts.showSkeleton();

        store.dispatch(SEARCH_USER, user);
        store.dispatch(SEARCH_POST, post);
    }

    /**
     * bind events
     *
     */
    bindEvent() {}
}

document.addEventListener("DOMContentLoaded", function () {
    new MainPage();
});
