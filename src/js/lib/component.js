import Store from "../store/store";
import { CHANGE_STATE } from "../store/actions";

export default class Component {
    constructor(props = {}) {
        let self = this;

        self.render = self.render || function () {};

        /* 자식 컴포넌트에서 Store instance를 전달 받은 경우 */
        if (props.store instanceof Store) {
            /* 상태 변경 이벤트 구독 */
            props.store.events.subscribe(CHANGE_STATE, () => self.render());
        }

        if (props["$elem"]) {
            self.$elem = props.$elem;
        }
    }
}
