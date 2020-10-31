import Component from "./component";
import store from "../store";
const moreBtn = require("../../pug/templates/more_btn.pug");

/**
 * more btn component
 *
 */
export default class MoreBtn extends Component {
    /* 하위 클래스에서 정의한 로더 */
    public readonly loader!: () => void;
    /* 하위 클래스에서 정의한 액션 키 */
    public readonly action!: string;
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
     * fetch more
     *
     * @memberof MoreBtn
     */
    handleFetchMore = () => {
        const self = this;

        self.hideMoreBtn();

        self.loader();

        store.dispatch(self.action);
    };

    /**
     * hide more btn
     *
     * @memberof MoreBtn
     */
    hideMoreBtn = () => {
        const self = this;

        const { wrapper } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        $wrapper.innerHTML = "";
    };

    /**
     * renderer
     *
     * @memberof MoreBtn
     */
    render = () => {
        const self = this;

        const { type } = self;

        const { data, limit } = store.state[type];

        const { wrapper } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        let template = "";
        if (data.length > 0 && data.length % limit === 0) {
            template = moreBtn({ type });
        }

        $wrapper.innerHTML = template;

        self.bindEvt();
    };
}
