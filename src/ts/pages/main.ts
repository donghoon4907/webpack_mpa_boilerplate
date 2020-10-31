"use strict";

import "../../sass/index.scss";
import store from "../store";
import { SEARCH_USER, SEARCH_POST } from "../store/actions";
import UserList from "../components/user_list";
import PostList from "../components/post_list";
import UserMoreBtn from "../components/user_more_btn";
import PostMoreBtn from "../components/post_more_btn";
import UserTotal from "../components/user_total";
import PostTotal from "../components/post_total";

class MainPage {
    /* 셀렉터 객체 */
    public readonly selector: any;
    /* 내부 상태 */
    public readonly state: any;
    /* 사용자 목록 */
    public readonly users: any;
    /* 포스트 목록 */
    public readonly posts: any;

    constructor() {
        this.selector = {};

        this.state = {};

        this.users = new UserList();

        new UserTotal();

        new UserMoreBtn({
            loader: () => this.users.showSkeleton()
        });

        this.posts = new PostList();

        new PostTotal();

        new PostMoreBtn({
            loader: () => this.posts.showSkeleton()
        });

        this.users.showSkeleton();
        this.posts.showSkeleton();

        store.dispatch(SEARCH_USER);
        store.dispatch(SEARCH_POST);

        this.bindEvent();
    }

    /**
     * bind events
     *
     * @memberof MainPage
     */
    bindEvent = () => {};
}

new MainPage();
