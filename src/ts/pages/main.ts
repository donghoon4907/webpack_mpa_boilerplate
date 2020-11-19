"use strict";

import "../../sass/index.scss";
import List from "../components/list";
import MoreBtn from "../components/more_btn";
import Total from "../components/total";
import UserCard from "../components/user_card";
import PostCard from "../components/post_card";
import UserSkeletonLoader from "../components/user_skeleton";
import PostSkeletonLoader from "../components/post_skeleton";
import store from "../store";
import { SEARCH_USER, FETCHMORE_USER } from "../actions/user";
import { SEARCH_POST, FETCHMORE_POST } from "../actions/post";
import { logable } from "../decorators/logable";

class App {
    _users: List;
    _posts: List;

    constructor() {
        const userSkeleton = new UserSkeletonLoader(10);

        const postSkeleton = new PostSkeletonLoader(10);

        const userCard = new UserCard();

        const postCard = new PostCard();

        this._users = new List(userSkeleton, userCard);

        new MoreBtn(userCard.model);

        new Total(userCard.model);

        this._posts = new List(postSkeleton, postCard);

        new MoreBtn(postCard.model);

        new Total(postCard.model);

        this.handleSearchUser();

        this.handleSearchPost();

        this.bindEvt();
    }

    bindEvt() {
        document.addEventListener("click", (evt: any) => {
            const { dataset } = evt.target;

            if (dataset.js === "morebtn-user") {
                this.handleFetchMoreUser();
            } else if (dataset.js === "morebtn-post") {
                this.handleFetchMorePost();
            }
        });
    }

    @logable
    handleSearchPost() {
        store.dispatch(SEARCH_POST, {}, this._posts.showLoader);
    }

    @logable
    handleFetchMorePost() {
        store.dispatch(FETCHMORE_POST, {}, this._posts.showLoader);
    }

    @logable
    handleSearchUser() {
        store.dispatch(SEARCH_USER, {}, this._users.showLoader);
    }

    @logable
    handleFetchMoreUser() {
        store.dispatch(FETCHMORE_USER, {}, this._users.showLoader);
    }
}

new App();
