import Component from "./component";
import store from "../store";

export default class Total extends Component {
    /* 하위 클래스에서 정의한 셀렉터 객체 */
    public readonly selector!: any;
    /* 하위 클래스에서 정의한 이벤트 구독 키 */
    public readonly type!: string;
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
     * renderer
     *
     * @memberof Total
     */
    render = () => {
        const self = this;

        const { total } = store.state[self.type];

        const { wrapper } = self.selector;

        const $wrapper = document.querySelector(wrapper);

        $wrapper.innerHTML = ` (${total.toLocaleString()})`;
    };
}
