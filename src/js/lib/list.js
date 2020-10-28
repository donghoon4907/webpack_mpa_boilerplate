import Component from "./component";
import store from "../store";
import none from "../../pug/templates/none.pug";

/**
 * list component
 *
 */
export default class List extends Component {
    constructor({ type }) {
        super({ store, type });
    }

    /**
     * show skeleton
     *
     * @memberof List
     */
    async showSkeleton() {
        let self = this;

        const { wrapper } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        const skeleton = await import(/* webpackMode: "eager" */ `../../pug/templates/${self.type}_skeleton.pug`).then((obj) => obj.default);

        $wrapper.insertAdjacentHTML("beforeend", skeleton());
    }

    /**
     * hide skeleton
     *
     * @memberof List
     */
    hideSkeleton() {
        let self = this;

        const { wrapper, skeleton } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        $wrapper.querySelectorAll(skeleton).forEach(($e) => $e.remove());
    }

    /**
     * clear list
     *
     * @memberof List
     */
    clearList() {
        let self = this;

        const { wrapper } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        $wrapper.innerHTML = "";
    }

    /**
     * renderer
     *
     * @memberof List
     */
    async render() {
        let self = this;

        const { data } = store.state[self.type];

        const { wrapper } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        const newData = data.filter(({ id }) => !$wrapper.querySelector(`[data-key='${id}']`));

        let template;
        if (data.length === 0) {
            template = none;
        } else {
            template = await import(/* webpackMode: "eager" */ `../../pug/templates/${self.type}.pug`).then((obj) => obj.default);
        }

        self.hideSkeleton();

        $wrapper.insertAdjacentHTML("beforeend", template({ data: newData }));

        self.bindEvt();
    }
}
