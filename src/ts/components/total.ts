import { Render } from "../interface/render";
import store from "../store";
import { MODEL } from "../store/model";

export default class Total implements Render {
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

        const $wrap = document.querySelector(`[data-target='total-${_model}']`)!;

        $wrap.innerHTML = ` (${total.toLocaleString()})`;
    };
}
