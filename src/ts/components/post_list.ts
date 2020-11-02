import { Loader } from "../interface/loader";
import List from "../lib/list";
import { MODEL } from "../store/model";

export default class PostList extends List {
    /* 셀렉터 객체 */
    private readonly _selector: any;
    /* 이벤트 객체 */
    private readonly _subscriber: any = {};
    /**
     *
     * @constructor
     * @param loader
     */
    constructor(protected readonly _loader: Loader) {
        super(MODEL.POST, _loader);

        this._selector = {};
    }

    /**
     * bind events
     *
     * @memberof UserList
     */
    bindEvt = () => {};
}
