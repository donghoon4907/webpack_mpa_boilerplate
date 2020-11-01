import Skeleton from "./skeleton";
import store from "../store";
import { MODEL } from "../store/model";
const moreBtn = require("../../pug/templates/more_btn.pug");

export default class MoreBtn {
    /* skeleton instance */
    public readonly skeleton: Skeleton;
    /* wrap selector */
    public readonly wrap: string;
    /* subscribe type */
    public readonly type: MODEL;
    /* 하위 클래스에서 정의한 액션 키 */
    protected readonly action!: string;
    /* 하위 클래스에서 정의한 이벤트 바인딩 함수 */
    protected readonly bindEvt!: () => void;
    /**
     *
     * @constructor
     * @param type
     */
    constructor(type: MODEL) {
        this.type = type;

        this.wrap = `[data-js='more-${type}']`;

        this.skeleton = new Skeleton(type);

        store.events.subscribe(type, () => this.render());
    }

    /**
     * fetch more
     *
     * @memberof MoreBtn
     */
    public fetchMore = () => {
        const { skeleton, hide, action } = this;

        hide();

        skeleton.show();

        store.dispatch(action);

        return this;
    };

    /**
     * hide more btn
     *
     * @memberof MoreBtn
     */
    public hide = () => {
        const { wrap } = this;

        const $wrap = document.querySelector<HTMLElement>(wrap)!;

        $wrap.innerHTML = "";

        return this;
    };

    /**
     * renderer
     *
     * @memberof MoreBtn
     */
    public render() {
        const { type, wrap, bindEvt } = this;

        const { data, limit } = store.state[type];

        const $wrap = document.querySelector<HTMLElement>(wrap)!;

        let template = "";
        if (data.length > 0 && data.length % limit === 0) {
            template = moreBtn({ type });
        }

        $wrap.innerHTML = template;

        bindEvt();

        return this;
    }
}
