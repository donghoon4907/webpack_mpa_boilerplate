import Component from "../lib/component";
import store from "../store";
import { POST } from "../store/types";
import post from "../../pug/templates/post.pug";
import none from "../../pug/templates/none.pug";

/**
 * 포스트 목록 컴포넌트
 *
 * @property {object} selector
 */
export default class PostList extends Component {
    constructor() {
        super({ store, type: POST });

        this.selector = {
            $wrapper: "[data-js=posts]"
        };

        this.bindEvt();
    }

    /**
     * bind events
     *
     * @memberof PostList
     */
    bindEvt() {
        let self = this;
    }

    /**
     * renderer
     *
     * @memberof PostList
     */
    render() {
        let self = this;

        const { data } = store.state.post;

        const { $wrapper } = self.selector;

        let template;
        if (data && data.length === 0) {
            template = none;
        } else {
            template = post;
        }

        document.querySelector($wrapper).innerHTML = template({ data });
    }
}
