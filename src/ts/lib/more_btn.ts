import { Renderable } from "../interface/render";
import { Loadable, Loader } from "../interface/loader";
import store from "../store";
import { MODEL } from "../store/model";
const moreBtn = require("../../pug/templates/more_btn.pug");

export default abstract class MoreBtn implements Renderable, Loadable {
    /**
     *
     * @constructor
     */
    constructor(protected readonly _model: MODEL, protected readonly _loader: Loader) {
        store.events.subscribe(_model, () => this.render());
    }

    abstract bindEvt: () => void;

    /**
     * show loader
     *
     * @memberof MoreBtn
     */
    showLoader = () => {
        const { _model } = this;

        this._loader.show(_model);

        return this;
    };

    /**
     * hide loader
     *
     * @memberof MoreBtn
     */
    hideLoader = () => {
        const { _model } = this;

        this._loader.hide(_model);

        return this;
    };

    /**
     * hide more btn
     *
     * @memberof MoreBtn
     */
    hide = () => {
        const { _model } = this;

        const $wrap = document.querySelector<HTMLElement>(`[data-js='morebtn-${_model}']`)!;

        $wrap.innerHTML = "";

        return this;
    };

    /**
     * renderer
     *
     * @memberof MoreBtn
     */
    render = () => {
        const { hideLoader, _model, bindEvt } = this;

        const { data, limit } = store.state[_model];

        const $wrap = document.querySelector<HTMLElement>(`[data-js='more-${_model}']`)!;

        let template = "";
        if (data.length > 0 && data.length % limit === 0) {
            template = moreBtn({ type: _model });
        }

        hideLoader();

        $wrap.innerHTML = template;

        bindEvt();
    };
}
