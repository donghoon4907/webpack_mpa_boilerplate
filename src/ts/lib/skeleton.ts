import { MODEL } from "../store/model";

export default class Skeleton {
    /* wrap selector */
    public readonly wrap: string;
    /* subscribe type */
    public readonly type: MODEL;
    /**
     *
     * @constructor
     * @param type  - skeleton wrap selector
     */
    constructor(type: MODEL) {
        this.wrap = `[data-js='${type}']`;

        this.type = type;
    }

    /**
     * show skeleton
     *
     * @memberof Skeleton
     */
    public async show() {
        const { wrap, type } = this;

        const $wrap = document.querySelector<HTMLElement>(wrap)!;

        const template = await import(/* webpackMode: "eager" */ `../../pug/templates/${type}_skeleton.pug`).then((obj) => obj.default);

        $wrap.insertAdjacentHTML("beforeend", template());

        return this;
    }

    /**
     * hide skeleton
     *
     * @memberof List
     */
    public hide() {
        const { wrap, type } = this;

        const $wrap = document.querySelector<HTMLElement>(wrap)!;

        const skeletons = $wrap.querySelectorAll(`[data-js='${type}-skeleton']`);

        skeletons.forEach(($e) => $e.remove());

        return this;
    }
}
