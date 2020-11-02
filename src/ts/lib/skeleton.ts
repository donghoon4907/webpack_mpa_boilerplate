import { Loader } from "../interface/loader";
import { MODEL } from "../store/model";

export default class Skeleton implements Loader {
    /**
     * show skeleton
     *
     * @memberof Skeleton
     */
    async show(type: MODEL) {
        const $wrap = document.querySelector<HTMLElement>(`[data-js='${type}']`)!;

        const template = await import(/* webpackMode: "eager" */ `../../pug/templates/${type}_skeleton.pug`).then((obj) => obj.default);

        $wrap.insertAdjacentHTML("beforeend", template());

        return this;
    }

    /**
     * hide skeleton
     *
     * @memberof Skeleton
     */
    hide(type: MODEL) {
        const $wrap = document.querySelector<HTMLElement>(`[data-js='${type}']`)!;

        const skeletons = $wrap.querySelectorAll(`[data-js='${type}-skeleton']`);

        skeletons.forEach(($e) => $e.remove());

        return this;
    }
}
