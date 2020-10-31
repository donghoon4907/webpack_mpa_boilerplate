import Total from "../lib/total";
import { TYPE_POST } from "../store/types";

export default class PostTotal extends Total {
    /* 셀렉터 객체 */
    public readonly selector!: any;
    /**
     *
     * @constructor
     */
    constructor() {
        super(TYPE_POST);

        this.selector = {
            wrapper: `[data-js='total-${TYPE_POST}']`
        };
    }
}
