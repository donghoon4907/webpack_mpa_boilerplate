import Component from "./component";
import store from "../store";

/**
 * total component
 *
 */
export default class Total extends Component {
    constructor({ type }) {
        super({ store, type });
    }

    /**
     * renderer
     *
     * @memberof Total
     */
    render() {
        let self = this;

        const { total } = store.state[self.type];

        const { wrapper } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        $wrapper.innerHTML = ` (${total.toLocaleString()})`;
    }
}
