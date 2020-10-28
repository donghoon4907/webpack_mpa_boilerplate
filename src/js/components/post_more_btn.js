import { fromEvent } from "rxjs";
import { throttleTime } from "rxjs/operators";
import MoreBtn from "../lib/more_btn";
import { FETCHMORE_POST } from "../store/actions";
import { TYPE_POST } from "../store/types";

/**
 * post more btn component
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
     * @memberof PostMoreBtn
     */
    bindEvt() {
        let self = this;

        const { btn } = self.selector;

        this.events.btn$ = fromEvent(document.querySelector(btn), "click");

        this.events.btn$.pipe(throttleTime(1000)).subscribe(() => self.handleFetchMore());
    }
}
