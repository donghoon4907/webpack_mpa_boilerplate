import Component from "../lib/component";
import store from "../store";
import { USER } from "../store/types";
import user from "../../pug/templates/user.pug";
import skeleton from "../../pug/templates/user_skeleton.pug";
import none from "../../pug/templates/none.pug";

/**
 * 사용자 목록 컴포넌트
 *
 * @property {object} selector
 */
export default class UserList extends Component {
    constructor() {
        super({ store, type: USER });

        this.selector = {
            $wrapper: "[data-js=users]"
        };

        this.handleShowSkeleton();
    }

    /**
     * bind events
     *
     * @memberof UserList
     */
    bindEvt() {
        let self = this;
    }

    /**
     * show skeleton
     *
     * @memberof UserList
     */
    handleShowSkeleton() {
        let self = this;

        const { $wrapper } = self.selector;

        const innerHTML = document.querySelector($wrapper).innerHTML;

        document.querySelector($wrapper).innerHTML = innerHTML + skeleton();
    }

    /**
     * clear list
     *
     * @memberof UserList
     */
    handleClear() {
        let self = this;

        const { $wrapper } = self.selector;

        document.querySelector($wrapper).innerHTML = "";
    }

    /**
     * renderer
     *
     * @memberof UserList
     */
    render() {
        let self = this;

        const { data } = store.state.user;

        const { $wrapper } = self.selector;

        let template;
        if (data.length === 0) {
            template = none;
        } else {
            template = user;
        }

        document.querySelector($wrapper).innerHTML = template({ data });

        this.bindEvt();
    }
}
