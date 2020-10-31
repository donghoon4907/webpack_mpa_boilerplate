import Component from "./component";
import store from "../store";
const none = require("../../pug/templates/none.pug");

export default class List extends Component {
    /* 하위 클래스에서 정의한 셀렉터 객체 */
    public readonly selector!: any;
    /* 하위 클래스에서 정의한 이벤트 구독 키 */
    public readonly type!: string;
    /* 하위 클래스에서 정의한 이벤트 바인딩 함수 */
    public readonly bindEvt!: () => void;
    /**
     *
     * @constructor
     * @param type  - 이벤트 구독 키
     */
    constructor(type: string) {
        super(type, store);

        this.type = type;
    }

    /**
     * show skeleton
     *
     * @memberof List
     */
    public showSkeleton = async () => {
        const self = this;

        const { wrapper } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        const skeleton = await import(/* webpackMode: "eager" */ `../../pug/templates/${self.type}_skeleton.pug`).then(
            (obj) => obj.default
        );

        $wrapper.insertAdjacentHTML("beforeend", skeleton());
    };

    /**
     * hide skeleton
     *
     * @memberof List
     */
    public hideSkeleton = () => {
        const self = this;

        const { wrapper, skeleton } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        $wrapper.querySelectorAll(skeleton).forEach(($e: HTMLElement) => $e.remove());
    };

    /**
     * clear list
     *
     * @memberof List
     */
    public clearList = () => {
        const self = this;

        const { wrapper } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        $wrapper.innerHTML = "";
    };

    /**
     * renderer
     *
     * @memberof List
     */
    public render = async () => {
        const self = this;

        const { data } = store.state[self.type];

        const { wrapper } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        const newData = data.filter((v: any) => !$wrapper.querySelector(`[data-key='${v.id}']`));

        let template;
        if (data.length === 0) {
            template = none;
        } else {
            template = await import(/* webpackMode: "eager" */ `../../pug/templates/${self.type}.pug`).then((obj) => obj.default);
        }

        self.hideSkeleton();

        $wrapper.insertAdjacentHTML("beforeend", template({ data: newData }));

        self.bindEvt();
    };
}
