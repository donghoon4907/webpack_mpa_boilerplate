import List from "../lib/list";
import { MODEL } from "../store/model";

export default class PostList extends List {
    /* 셀렉터 객체 */
    public readonly selector: any;
    /* 이벤트 객체 */
    public readonly subscriber: any;
    /**
     *
     * @constructor
     */
    constructor() {
        super(MODEL.POST);

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
