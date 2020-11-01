import { fromEvent } from "rxjs";
import MoreBtn from "../lib/more_btn";
import { FETCHMORE_USER } from "../store/actions";
import { MODEL } from "../store/model";

export default class UserMoreBtn extends MoreBtn {
    /* 셀렉터 객체 */
    public readonly selector: any;
    /* 이벤트 객체 */
    public readonly subscriber: any;
    /* 액션 키 */
    protected readonly action: any;
    /**
     *
     * @constructor
     */
    constructor() {
        super(MODEL.USER);

        this.selector = {
            btn: `[data-js=morebtn-${MODEL.USER}]`
        };

        this.subscriber = {};

        this.action = FETCHMORE_USER;
    }

    /**
     * bind events
     *
     * @memberof UserMoreBtn
     */
    public bindEvt = () => {
        const { selector, subscriber, fetchMore } = this;

        const $btn = document.querySelector(selector.btn);

        subscriber.btn$ = fromEvent($btn, "click").subscribe(() => fetchMore());
    };
}
