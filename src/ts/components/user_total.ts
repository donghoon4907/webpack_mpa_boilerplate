import Total from "../lib/total";
import { TYPE_USER } from "../store/types";

export default class UserTotal extends Total {
    /* 셀렉터 객체 */
    public readonly selector!: any;
    /**
     *
     * @constructor
     */
    constructor() {
        super(TYPE_USER);

        this.selector = {
            wrapper: `[data-js='total-${TYPE_USER}']`
        };
    }
}
