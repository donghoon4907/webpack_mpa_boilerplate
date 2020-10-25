import Component from "../lib/component";
import store from "../store";
import { FETCHMORE_USER } from "../store/actions";
import moreBtn from "../../pug/templates/more_btn.pug";

/**
 * 더보기 버튼 컴포넌트
 *
 * @property {object} type
 * @property {object} state
 * @property {object} selector
 */
export default class MoreBtn extends Component {
    constructor({ type, page, limit }) {
        super({ store, type });

        this.type = type.toLowerCase();

        this.state = {
            page,
            limit
        };

        this.selector = {
            $wrapper: `[data-js=more-${this.type}]`,
            $btn: `[data-js=morebtn-${this.type}]`
        };
    }

    /**
     * bind events
     *
     * @memberof MoreBtn
     */
    bindEvt() {
        let self = this;

        const { $btn } = self.selector;

        document.querySelector($btn).onclick = () => self.handleFetchMore();
    }

    /**
     * fetch more
     *
     * @memberof MoreBtn
     */
    handleFetchMore() {
        let self = this;

        store.dispatch(FETCHMORE_USER, self.state);

        self.state.page++;
    }

    /**
     * renderer
     *
     * @memberof MoreBtn
     */
    render() {
        let self = this;

        const { type } = self;

        const { data } = store.state[type];

        const { $wrapper } = self.selector;

        let template = "";
        if (data && data.length > 0 && data.length % self.state.limit === 0) {
            template = moreBtn({ type });
        }

        document.querySelector($wrapper).innerHTML = template;

        this.bindEvt();
    }
}
