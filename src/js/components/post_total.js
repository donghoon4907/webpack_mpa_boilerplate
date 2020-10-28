import Total from "../lib/total";
import { TYPE_POST } from "../store/types";

/**
 * post total component
 *
 * @property {string} type
 * @property {object} selector
 */
export default class PostTotal extends Total {
    constructor() {
        super({
            type: TYPE_POST
        });

        this.type = TYPE_POST;

        this.selector = {
            wrapper: `[data-js='total-${this.type}']`
        };
    }
}
