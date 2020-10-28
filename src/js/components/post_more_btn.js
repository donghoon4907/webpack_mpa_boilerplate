import { fromEvent } from "rxjs";
import { throttleTime } from "rxjs/operators";
import MoreBtn from "../lib/more_btn";
import { FETCHMORE_POST } from "../store/actions";
import { TYPE_POST } from "../store/types";

/**
 * 포스트 더보기 버튼 컴포넌트
 *
 * @property {object} type
 * @property {object} state
 * @property {object} selector
 * @property {object} loader
 * @property {object} action
 */
export default class PostMoreBtn extends MoreBtn {
    constructor({ page, limit, loader }) {
        super({
            type: TYPE_POST
        });

        this.type = TYPE_POST;

        this.action = FETCHMORE_POST;

        this.state = {
            page,
            limit
        };

        this.selector = {
            wrapper: `[data-js=more-${this.type}]`,
            btn: `[data-js=morebtn-${this.type}]`
        };

        this.events = {};

        this.loader = loader || function () {};
    }

    /**
     * bind events
     *
     * @memberof MoreBtn
     */
    bindEvt() {
        let self = this;

        const { btn } = self.selector;

        this.events.btn$ = fromEvent(document.querySelector(btn), "click");

        this.events.btn$.pipe(throttleTime(1000)).subscribe(() => self.handleFetchMore());
    }
}
