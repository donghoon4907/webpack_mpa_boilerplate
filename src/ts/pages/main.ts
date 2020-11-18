"use strict";

import "../../sass/index.scss";
import { fromEvent } from "rxjs";
import UserList from "../components/user_list";
import PostList from "../components/post_list";
import MoreBtn from "../components/more_btn";
import Total from "../components/total";
import { UserSkeletonLoader, postSkeletonLoader } from "../components/skeleton";
import store from "../store";
import { SEARCH_USER, FETCHMORE_USER } from "../actions/user";
import { SEARCH_POST, FETCHMORE_POST } from "../actions/post";
import { logable } from "../decorator/logable";

class App {
    /* user instance */
    private readonly _users: UserList;
    /* post instance */
    private readonly _posts: PostList;

    constructor() {
        const userSkeleton = new UserSkeletonLoader();

        const postSkeleton = new postSkeletonLoader();

        this._users = new UserList(userSkeleton);

        new MoreBtn(this._users.model);

        new Total(this._users.model);

        this._posts = new PostList(postSkeleton);

        new MoreBtn(this._posts.model);

        new Total(this._posts.model);

        this.handleSearchUser();

        this.handleSearchPost();

        this.bindEvt();
    }
    /**
     * bind events
     *
     */
    bindEvt() {
        fromEvent(document, "click").subscribe((evt: any) => {
            const { dataset } = evt.target;

            if (dataset.js === "morebtn-user") {
                this.handleFetchMoreUser();
            } else if (dataset.js === "morebtn-post") {
                this.handleFetchMorePost();
            }
        });
    }
    /**
     * search post
     *
     */
    @logable
    handleSearchPost() {
        store.dispatch(SEARCH_POST, {}, this._posts.showLoader);
    }
    /**
     * fetch post
     *
     */
    @logable
    handleFetchMorePost() {
        store.dispatch(FETCHMORE_POST, {}, this._posts.showLoader);
    }
    /**
     * search user
     *
     */
    @logable
    handleSearchUser() {
        store.dispatch(SEARCH_USER, {}, this._users.showLoader);
    }
    /**
     * fetch post
     *
     */
    @logable
    handleFetchMoreUser() {
        store.dispatch(FETCHMORE_USER, {}, this._users.showLoader);
    }
}

new App();
