import store from "../store";
import { MODEL } from "../store/model";

export default class Total {
    /* wrap selector */
    public readonly wrap: string;
    /* subscribe type */
    public readonly type: MODEL;
    /**
     *
     * @constructor
     * @param type
     */
    constructor(type: MODEL) {
        this.type = type;

        this.wrap = `[data-js='total-${type}']`;

        store.events.subscribe(type, () => this.render());
    }

    /**
     * renderer
     *
     * @memberof Total
     */
    public render() {
        const { wrap, type } = this;

        const { total } = store.state[type];

        const $wrap = document.querySelector(wrap)!;

        $wrap.innerHTML = ` (${total.toLocaleString()})`;

        return this;
    }
}
