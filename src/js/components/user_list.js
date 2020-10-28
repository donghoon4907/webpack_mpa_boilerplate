import List from "../lib/list";
import { TYPE_USER } from "../store/types";
import template from "../../pug/templates/user.pug";
import skeleton from "../../pug/templates/user_skeleton.pug";

/**
 * user list component
 *
 * @property {string} type
 * @property {object} template
 * @property {object} skeleton
 * @property {object} selector
 */
export default class UserList extends List {
    constructor() {
        super({
            type: TYPE_USER
        });

        this.type = TYPE_USER;

        this.template = template;

        this.skeleton = skeleton;

        this.selector = {
            wrapper: `[data-js='${this.type}']`,
            skeleton: `[data-js='${this.type}-skeleton']`
        };
    }

    /**
     * bind events
     *
     * @memberof UserList
     */
    bindEvt() {}
}
