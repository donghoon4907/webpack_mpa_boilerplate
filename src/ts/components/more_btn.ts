import { Render } from "../interfaces/render";
import { MODEL } from "../store/model";
import store from "../store";
import moreBtn from "../../pug/templates/more_btn.pug";

export default class MoreBtn implements Render {
    /* Render wrap */
    private readonly $wrap: HTMLElement | null;
    /**
     * More button component
     *
     * @param    _model
     * @property `render`
     */
    constructor(private readonly _model: MODEL) {
        this.$wrap = document.querySelector(`[data-target='more-${_model}']`);

        store.events.subscribe(_model, (state: any) => this.render(state));
    }

    render = (state: any) => {
        const { _model, $wrap } = this;

        const { data, limit } = state[_model];

        let template = "";
        if (data.length > 0 && data.length % limit === 0) {
            template = moreBtn({ type: _model });
        }

        if ($wrap) {
            $wrap.innerHTML = template;
        }
    };
}
