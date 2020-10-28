import Component from "../lib/component";
import store from "../store";
import moreBtn from "../../pug/templates/more_btn.pug";

/**
 * more btn component
 *
 */
export default class MoreBtn extends Component {
    constructor({ type }) {
        super({
            store,
            type
        });
    }

    /**
     * fetch more
     *
     * @memberof MoreBtn
     */
    handleFetchMore() {
        let self = this;

        self.hideMoreBtn();

        self.loader();

        store.dispatch(self.action, self.state);

        self.state.page++;
    }

    /**
     * hide more btn
     *
     * @memberof MoreBtn
     */
    hideMoreBtn() {
        let self = this;

        const { wrapper } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        $wrapper.innerHTML = "";
    }

    /**
     * hide more btn
     *
     * @memberof MoreBtn
     */
    clearMoreBtn() {
        let self = this;

        self.hideMoreBtn();

        self.state.page = 1;
    }

    /**
     * renderer
     *
     * @memberof MoreBtn
     */
    render() {
        let self = this;

        const { type, state } = self;

        const { data } = store.state[type];

        const { wrapper } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        let template = "";
        if (data.length > 0 && data.length % state.limit === 0) {
            template = moreBtn({ type });
        }

        $wrapper.innerHTML = template;

        self.bindEvt();
    }
}
