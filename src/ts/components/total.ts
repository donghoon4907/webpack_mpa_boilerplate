import { Render } from "../interfaces/render";
import store from "../store";
import { MODEL } from "../store/model";

export default class Total implements Render {
    /**
     * Total component
     *
     * @param    _model
     * @property `render`
     */
    constructor(protected readonly _model: MODEL) {
        store.events.subscribe(_model, () => this.render());
    }

    render = () => {
        const { _model } = this;

        const { total } = store.state[_model];

        const $wrap = document.querySelector(`[data-target='total-${_model}']`)!;

        $wrap.innerHTML = ` (${total.toLocaleString()})`;
    };
}
