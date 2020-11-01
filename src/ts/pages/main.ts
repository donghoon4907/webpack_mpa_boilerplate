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
    private readonly selector: any;
    /* 이벤트 객체 */
    private readonly observer: any;
    /* users instance */
    private readonly users: UserList;
    /* user total instance */
    private readonly userTotal: UserTotal;
    /* user moreBtn instance */
    private readonly userMoreBtn: UserMoreBtn;
    /* post instance */
    private readonly posts: PostList;
    /* post total instance */
    private readonly postTotal: PostTotal;
    /* post moreBtn instance */
    private readonly postMoreBtn: PostMoreBtn;

    constructor() {
        this.selector = {};

        this.observer = {};

        this.users = new UserList();

        this.userTotal = new UserTotal();

        this.userMoreBtn = new UserMoreBtn();

        this.posts = new PostList();

        this.postTotal = new PostTotal();

        this.postMoreBtn = new PostMoreBtn();

        this.users.skeleton.show();
        this.posts.skeleton.show();

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
