import List from "../lib/list";
import { TYPE_USER } from "../store/types";

/**
 * user list component
 *
 * @property {string} type
 * @property {object} selector
 */
export default class UserList extends List {
    constructor() {
        super({
            type: TYPE_USER
        });

        this.type = TYPE_USER;

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
