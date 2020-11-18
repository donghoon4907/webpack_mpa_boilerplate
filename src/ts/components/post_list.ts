import { Loader } from "../interfaces/loader";
import List from "./list";
import { MODEL } from "../store/model";
import post from "../../pug/templates/post.pug";
import none from "../../pug/templates/none.pug";

const _model = MODEL.POST;

export default class PostList extends List {
    /* 셀렉터 객체 */
    private readonly _selector: any;
    /* 이벤트 객체 */
    private readonly _subscriber: any;

    constructor(private readonly _loader: Loader) {
        super(_model);

        this._selector = {
            wrap: "[data-target='post']"
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
    render = (state: any) => {
        const { hideLoader, bindEvt, _selector } = this;

        const { data } = state.post;

        const $wrap = document.querySelector(_selector.wrap);

        const newData = data.filter((v: any) => !$wrap?.querySelector(`[data-key='${v.id}']`));

        let template;
        if (data.length === 0) {
            template = none;
        } else {
            template = post;
        }

        hideLoader();

        $wrap?.insertAdjacentHTML("beforeend", template({ data: newData }));

        bindEvt();
    };
}
