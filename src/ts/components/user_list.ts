import List from "../lib/list";
import { MODEL } from "../store/model";

export default class UserList extends List {
    /* 셀렉터 객체 */
    public readonly selector: any;
    /* 이벤트 객체 */
    public readonly subscriber: any;
    /**
     *
     * @constructor
     */
    constructor() {
        super(MODEL.USER);

        this.selector = {};

        this.subscriber = {};
    }

    /**
     * bind events
     *
     * @memberof UserList
     */
    public bindEvt = () => {};
}
