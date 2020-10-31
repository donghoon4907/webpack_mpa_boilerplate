import { fromEvent } from "rxjs";
import MoreBtn from "../lib/more_btn";
import { FETCHMORE_USER } from "../store/actions";
import { TYPE_USER } from "../store/types";

export default class UserMoreBtn extends MoreBtn {
    /* 셀렉터 객체 */
    public readonly selector!: any;
    /* 액션 키 */
    public readonly action!: any;
    /* 이벤트 목록 */
    public readonly events!: any;
    /* 로더 */
    public readonly loader!: () => void;
    /**
     *
     * @constructor
     * @param param.loader - 로더
     */
    constructor({ loader }: { loader: () => void }) {
        super(TYPE_USER);

        this.selector = {
            wrapper: `[data-js=more-${TYPE_USER}]`,
            btn: `[data-js=morebtn-${TYPE_USER}]`
        };

        this.action = FETCHMORE_USER;

        this.events = {};

        this.loader = loader || function () {};
    }

    /**
     * bind events
     *
     * @memberof UserMoreBtn
     */
    bindEvt = () => {
        const self = this;

        const { btn } = self.selector;

        this.events.btn$ = fromEvent(document.querySelector(btn), "click").subscribe(() => self.handleFetchMore());
    };
}
