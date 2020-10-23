"use strict";

import "../../sass/index.scss";
import store from "../store";
import { SEARCH_USER } from "../store/actions";
import List from "../components/list";

/**
 * 메인 페이지 컴포넌트
 *
 * @property {object} state     - local state management
 * @property {object} selector  - used selectors in page
 * @property {object} list      - list component instance
 */
class MainController {
    constructor() {
        this.state = {
            limit: 10,
            page: 1
        };
        this.selector = {
            $searchUserForm: "[data-js=search-user__form]",
            $searchUserInput: "[data-js=search-user__input]"
        };
        this.list = new List();

        this.bindEvent();

        store.dispatch(SEARCH_USER, this.state);
    }

    /**
     * bind events
     *
     */
    bindEvent() {
        let self = this;

        const { $searchUserForm } = self.selector;

        /* search button event */
        document.querySelector($searchUserForm).onsubmit = (evt) => self.handleSearch(evt);
    }

    /**
     * search handler
     *
     */
    handleSearch(evt) {
        evt.preventDefault();

        let self = this;

        const { $searchUserInput } = self.selector;

        const firstName = document.querySelector($searchUserInput).value;

        self.state = Object.assign(
            {},
            {
                limit: 10,
                page: 1,
                firstName
            }
        );

        store.dispatch(SEARCH_USER, self.state);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    new MainController();
});
