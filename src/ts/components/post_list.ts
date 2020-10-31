import List from "../lib/list";
import { TYPE_POST } from "../store/types";

export default class PostList extends List {
    /* 셀렉터 객체 */
    public readonly selector!: any;
    /**
     *
     * @constructor
     */
    constructor() {
        super(TYPE_POST);

        this.selector = {
            wrapper: `[data-js='${TYPE_POST}']`,
            skeleton: `[data-js='${TYPE_POST}-skeleton']`
        };
    }

    /**
     * bind events
     *
     * @memberof PostList
     */
    bindEvt = () => {};
}
