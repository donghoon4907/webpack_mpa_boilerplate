import { Renderable } from "../interface/render";
import store from "../store";
import { MODEL } from "../store/model";

export default abstract class Total implements Renderable {
    /**
     *
     * @constructor
     */
    constructor(protected readonly _model: MODEL) {
        store.events.subscribe(_model, () => this.render());
    }

    /**
     * renderer
     *
     * @memberof Total
     */
    render = () => {
        const { _model } = this;

        const { total } = store.state[_model];

        const $wrap = document.querySelector(`[data-js='total-${_model}']`)!;

        $wrap.innerHTML = ` (${total.toLocaleString()})`;
    };
}
