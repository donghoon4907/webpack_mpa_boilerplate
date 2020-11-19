import { Render } from "../interfaces/render";
import Loader from "./loader";
import Template from "./template";
import none from "../../pug/templates/none.pug";
import store from "../store";

export default class List implements Render {
    /* Render wrap */
    private $wrap: HTMLElement | null;
    /**
     * List component
     *
     * @param    _loader
     * @param    _item
     * @property `showLoader`
     * @property `hideLoader`
     * @property `render`
     */
    constructor(private readonly _loader: Loader, private readonly _item: Template) {
        this.$wrap = document.querySelector(`[data-target='${this._item.model}']`);

        store.events.subscribe(_item.model, (state: any) => this.render(state));
    }

    showLoader = () => {
        const { $wrap, _loader } = this;

        $wrap?.insertAdjacentHTML("beforeend", _loader.template());
    };

    hideLoader = () => {
        const { $wrap } = this;

        const skeletons = $wrap?.querySelectorAll("[data-target='loader']");

        skeletons?.forEach(($e) => $e.remove());
    };

    clear = () => {
        const { $wrap } = this;

        if ($wrap) {
            $wrap.innerHTML = "";
        }
    };

    render = (state: any) => {
        const { hideLoader, _item } = this;

        const { data } = state[_item.model];

        const $wrap = document.querySelector(`[data-target='${_item.model}']`);

        const newData = data.filter((v: any) => !$wrap?.querySelector(`[data-key='${v.id}']`));

        let template;
        if (data.length === 0) {
            template = none;
        } else {
            template = newData.reduce((acc: string, cur: any) => acc + _item.template(cur), "");
        }

        hideLoader();

        $wrap?.insertAdjacentHTML("beforeend", template);
    };
}
