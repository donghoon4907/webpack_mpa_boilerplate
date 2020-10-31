import Store from "../store/store";

export default class Component {
    /* 하위 클래스에 정의된 렌더링 메서드 */
    public render?: () => void;
    /**
     *
     * @constructor
     * @param type  - 이벤트 구독 키
     * @param store - 상태 저장소 객체
     */
    constructor(type: string, store: Store) {
        const self = this;

        self.render = self.render || function () {};

        store.events.subscribe(type, () => self.render!());
    }
}
