import List from "../lib/list";
import { TYPE_POST } from "../store/types";

/**
 * post list component
 *
 * @property {string} type
 * @property {object} selector
 */
export default class PostList extends List {
    constructor() {
        super({
            type: TYPE_POST
        });

        this.type = TYPE_POST;

        this.selector = {
            wrapper: `[data-js='${this.type}']`,
            skeleton: `[data-js='${this.type}-skeleton']`
        };
    }

    /**
     * bind events
     *
     * @memberof PostList
     */
    bindEvt() {}
}
