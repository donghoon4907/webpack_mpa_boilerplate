import Component from "./component";
import store from "../store";
import none from "../../pug/templates/none.pug";

/**
 * 목록 컴포넌트
 *
 */
export default class List extends Component {
    constructor({ type }) {
        super({ store, type });
    }

    /**
     * show skeleton
     *
     * @memberof UserList
     */
    showSkeleton = async () => {
        let self = this;

        const { wrapper } = self.selector;

        const skeleton = await import(`../../pug/templates/${self.type}_skeleton.pug`).then((obj) => obj.default);

        const $wrapper = document.querySelector(wrapper);

        $wrapper.insertAdjacentHTML("beforeend", skeleton());
    };

    /**
     * hide skeleton
     *
     * @memberof UserList
     */
    hideSkeleton = () => {
        let self = this;

        const { wrapper, skeleton } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        $wrapper.querySelectorAll(skeleton).forEach(($e) => $e.remove());
    };

    /**
     * clear list
     *
     * @memberof UserList
     */
    clearList = () => {
        let self = this;

        const { wrapper } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        $wrapper.innerHTML = "";
    };

    /**
     * renderer
     *
     * @memberof UserList
     */
    render = async () => {
        let self = this;

        const { data } = store.state[self.type];

        const { wrapper } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        const newData = data.filter(({ id }) => !$wrapper.querySelector(`[data-key='${id}']`));

        let template;
        if (data.length === 0) {
            template = none;
        } else {
            template = await import(`../../pug/templates/${self.type}.pug`).then((obj) => obj.default);
        }

        self.hideSkeleton();

        $wrapper.insertAdjacentHTML("beforeend", template({ data: newData }));

        self.bindEvt();
    };
}
