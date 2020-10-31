import List from "../lib/list";
import { TYPE_USER } from "../store/types";

export default class UserList extends List {
    /* 셀렉터 객체 */
    public readonly selector!: any;
    /**
     *
     * @constructor
     */
    constructor() {
        super(TYPE_USER);

        this.selector = {
            wrapper: `[data-js='${TYPE_USER}']`,
            skeleton: `[data-js='${TYPE_USER}-skeleton']`
        };
    }

    /**
     * bind events
     *
     * @memberof UserList
     */
    bindEvt = () => {};
}
