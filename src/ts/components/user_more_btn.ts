import { fromEvent } from "rxjs";
import { Loader } from "../interface/loader";
import MoreBtn from "../lib/more_btn";
import { FETCHMORE_USER } from "../store/actions";
import { MODEL } from "../store/model";
import store from "../store";

export default class UserMoreBtn extends MoreBtn {
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
        super(MODEL.USER, _loader);

        this._selector = {
            btn: `[data-js=morebtn-${MODEL.USER}]`
        };
    }

    /**
     * bind events
     *
     * @memberof UserMoreBtn
     */
    bindEvt = () => {
        const { _selector, _subscriber, fetchMore } = this;

        const $btn = document.querySelector(_selector.btn);

        _subscriber.btn$ = fromEvent($btn, "click").subscribe(() => fetchMore());
    };

    /**
     * fetch more
     *
     * @memberof UserMoreBtn
     */
    fetchMore = () => {
        const { _loader, _model, hide } = this;

        hide();

        _loader.show(_model);

        store.dispatch(FETCHMORE_USER);

        return this;
    };
}
