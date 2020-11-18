import { Render } from "../interfaces/render";
import { MODEL } from "../store/model";
import store from "../store";
import moreBtn from "../../pug/templates/more_btn.pug";

export default class MoreBtn implements Render {
    constructor(private readonly _model: MODEL) {
        store.events.subscribe(_model, () => this.render());
    }

    /**
     * renderer
     *
     * @memberof MoreBtn
     */
    render = () => {
        const { _model } = this;

        const { data, limit } = store.state[_model];

        const $wrap = document.querySelector(`[data-target='more-${_model}']`)!;

        let template = "";
        if (data.length > 0 && data.length % limit === 0) {
            template = moreBtn({ type: _model });
        }

        $wrap.innerHTML = template;
    };
}
