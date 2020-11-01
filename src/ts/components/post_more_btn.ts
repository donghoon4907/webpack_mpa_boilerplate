import { fromEvent } from "rxjs";
import MoreBtn from "../lib/more_btn";
import { FETCHMORE_POST } from "../store/actions";
import { MODEL } from "../store/model";

export default class PostMoreBtn extends MoreBtn {
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
        super(MODEL.POST);

        this.selector = {
            btn: `[data-js=morebtn-${MODEL.POST}]`
        };

        this.subscriber = {};

        this.action = FETCHMORE_POST;
    }

    /**
     * bind events
     *
     * @memberof PostMoreBtn
     */
    public bindEvt = () => {
        const { selector, subscriber, fetchMore } = this;

        const $btn = document.querySelector(selector.btn);

        subscriber.btn$ = fromEvent($btn, "click").subscribe(() => fetchMore());
    };
}
