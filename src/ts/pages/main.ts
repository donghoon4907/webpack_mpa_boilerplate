"use strict";

import "../../sass/index.scss";
import UserList from "../components/user_list";
import PostList from "../components/post_list";
import UserMoreBtn from "../components/user_more_btn";
import PostMoreBtn from "../components/post_more_btn";
import UserTotal from "../components/user_total";
import PostTotal from "../components/post_total";
import Skeleton from "../lib/skeleton";
import store from "../store";
import { SEARCH_USER, SEARCH_POST } from "../store/actions";

class MainPage {
    /* users instance */
    users: UserList;
    /* post instance */
    posts: PostList;

    constructor() {
        const loader = new Skeleton();

        this.users = new UserList(loader);
        this.posts = new PostList(loader);

        new UserTotal();
        new PostTotal();

        new UserMoreBtn(loader);
        new PostMoreBtn(loader);

        this.users.showLoader();
        store.dispatch(SEARCH_USER);

        this.posts.showLoader();
        store.dispatch(SEARCH_POST);
    }
}

new MainPage();
