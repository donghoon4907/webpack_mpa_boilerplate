import List from "../lib/list";
import { TYPE_POST } from "../store/types";

/**
 * 포스트 목록 컴포넌트
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
