import { Renderable } from "../interface/render";
import { Loadable, Loader } from "../interface/loader";
import { MODEL } from "../store/model";
import store from "../store";
const none = require("../../pug/templates/none.pug");

export default abstract class List implements Renderable, Loadable {
    /**
     *
     * @constructor
     * @param loader
     */
    constructor(protected readonly _model: MODEL, protected readonly _loader: Loader) {
        store.events.subscribe(_model, () => this.render());
    }

    abstract bindEvt(): void;

    /**
     * show loader
     *
     * @memberof List
     */
    showLoader = () => {
        const { _model } = this;

        this._loader.show(_model);

        return this;
    };

    /**
     * hide loader
     *
     * @memberof List
     */
    hideLoader = () => {
        const { _model } = this;

        this._loader.hide(_model);

        return this;
    };

    /**
     * renderer
     *
     * @memberof List
     */
    render = async () => {
        const { hideLoader, _model, bindEvt } = this;

        const { data } = store.state[_model];

        const $wrap = document.querySelector<HTMLElement>(`[data-js='${_model}']`)!;

        const newData = data.filter((v: any) => !$wrap.querySelector<HTMLElement>(`[data-key='${v.id}']`));

        let template;
        if (data.length === 0) {
            template = none;
        } else {
            template = await import(/* webpackMode: "eager" */ `../../pug/templates/${_model}.pug`).then((obj) => obj.default);
        }

        hideLoader();

        $wrap.insertAdjacentHTML("beforeend", template({ data: newData }));

        bindEvt();
    };
}
