import Skeleton from "./skeleton";
import store from "../store";
import { MODEL } from "../store/model";
const none = require("../../pug/templates/none.pug");

export default class List {
    /* skeleton instance */
    public skeleton: Skeleton;
    /* wrap selector */
    public readonly wrap: string;
    /* subscribe type */
    public readonly type: MODEL;
    /* 하위 클래스에서 정의한 이벤트 바인딩 함수 */
    protected readonly bindEvt!: () => void;
    /**
     *
     * @constructor
     * @param type
     */
    constructor(type: MODEL) {
        this.type = type;

        this.wrap = `[data-js='${type}']`;

        this.skeleton = new Skeleton(type);

        store.events.subscribe(type, () => this.render());
    }

    /**
     * renderer
     *
     * @memberof List
     */
    public async render() {
        const { skeleton, wrap, type, bindEvt } = this;

        const { data } = store.state[type];

        const $wrap = document.querySelector<HTMLElement>(wrap)!;

        const newData = data.filter((v: any) => !$wrap.querySelector<HTMLElement>(`[data-key='${v.id}']`));

        let template;
        if (data.length === 0) {
            template = none;
        } else {
            template = await import(/* webpackMode: "eager" */ `../../pug/templates/${type}.pug`).then((obj) => obj.default);
        }

        skeleton.hide();

        $wrap.insertAdjacentHTML("beforeend", template({ data: newData }));

        bindEvt();

        return this;
    }
}
