import { Render } from "../interfaces/render";
import { Loader } from "../interfaces/loader";
import Template from "../components/template";
import none from "../../pug/templates/none.pug";
import store from "../store";

export default class List implements Render {
    /**
     * List component
     *
     * @param _loader
     * @param _item
     * @property `showLoader`
     * @property `hideLoader`
     * @property `render`
     */
    constructor(private readonly _loader: Loader, private readonly _item: Template) {
        store.events.subscribe(_item.model, (state: any) => this.render(state));
    }

    /**
     * Show loader
     */
    showLoader = () => {
        const $wrap = document.querySelector(`[data-target='${this._item.model}']`);

        $wrap?.insertAdjacentHTML("beforeend", this._loader.template());
    };

    /**
     * Hide loader
     */
    hideLoader = () => {
        const $wrap = document.querySelector(`[data-target='${this._item.model}']`);

        const skeletons = $wrap?.querySelectorAll("[data-target='skeleton']");

        skeletons?.forEach(($e) => $e.remove());
    };

    /**
     * Renderer
     */
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
