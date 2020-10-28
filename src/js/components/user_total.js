import Total from "../lib/total";
import { TYPE_USER } from "../store/types";

/**
 * user total component
 *
 * @property {string} type
 * @property {object} selector
 */
export default class UserTotal extends Total {
    constructor() {
        super({
            type: TYPE_USER
        });

        this.type = TYPE_USER;

        this.selector = {
            wrapper: `[data-js='total-${this.type}']`
        };
    }
}
