import { Loader } from "../interfaces/loader";
import List from "./list";
import store from "../store";
import { MODEL } from "../store/model";
import user from "../../pug/templates/user.pug";
import none from "../../pug/templates/none.pug";

const _model = MODEL.USER;

export default class UserList extends List {
    /* 셀렉터 객체 */
    private readonly _selector: any;
    /* 이벤트 객체 */
    private readonly _subscriber: any;

    constructor(protected readonly _loader: Loader) {
        super(_model);

        this._selector = {
            wrap: "[data-target='user']"
        };

        this._subscriber = {};
    }

    /**
     * bind events
     *
     * @memberof PostList
     */
    bindEvt = () => {};

    /**
     * show loader
     *
     * @memberof PostList
     */
    showLoader = () => {
        const { wrap } = this._selector;

        const $wrap = document.querySelector(wrap);

        $wrap?.insertAdjacentHTML("beforeend", this._loader.template());
    };

    /**
     * hide loader
     *
     * @memberof PostList
     */
    hideLoader = () => {
        const { wrap } = this._selector;

        const $wrap = document.querySelector(wrap);

        const skeletons = $wrap?.querySelectorAll("[data-target='skeleton']");

        skeletons?.forEach(($e: HTMLElement) => $e.remove());
    };

    /**
     * renderer
     *
     * @memberof PostList
     */
    clear = () => {
        const { wrap } = this._selector;

        const $wrap = document.querySelector(wrap);

        const posts = $wrap?.querySelectorAll("[data-target='list']");

        posts?.forEach(($e: HTMLElement) => $e.remove());
    };

    /**
     * renderer
     *
     * @memberof PostList
     */
    render = (state: any) => {
        const { hideLoader, bindEvt, _selector } = this;

        const { data } = state.user;

        const $wrap = document.querySelector(_selector.wrap);

        const newData = data.filter((v: any) => !$wrap?.querySelector(`[data-key='${v.id}']`));

        let template;
        if (data.length === 0) {
            template = none;
        } else {
            template = user;
        }

        hideLoader();

        $wrap?.insertAdjacentHTML("beforeend", template({ data: newData }));

        bindEvt();
    };
}
