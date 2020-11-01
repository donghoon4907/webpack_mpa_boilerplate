export default class PubSub {
    /* 구독 중인 이벤트 목록 */
    public readonly subscribers: any;
    /**
     *
     * @constructor
     */
    constructor() {
        this.subscribers = {};
    }

    /**
     * 이벤트 구독
     *
     * @param evt
     * @param callback
     * @memberof PubSub
     */
    subscribe(evt: string, callback: () => void) {
        const self = this;

        const { subscribers } = self;

        /* 이벤트 검증 */
        if (evt === "") {
            console.error("evt is not defined");
            return false;
        }

        /* 이벤트 컬렉션이 구성되지 않은 경우 새로운 컬렉션을 추가 */
        if (!subscribers[evt]) {
            subscribers[evt] = [];
        }

        /* 이벤트 컬렉션에 추가 */
        subscribers[evt].push(callback);

        return true;
    }

    /**
     * 이벤트 구독 해제
     *
     * @param evt
     * @memberof PubSub
     */
    unsubscribe(evt: string) {
        const self = this;

        const { subscribers } = self;

        /* 이벤트 검증 */
        const index = subscribers.indexOf(evt);
        if (index === -1) {
            console.error("evt is not subscribed");
            return false;
        }

        /* 구독 해제 */
        subscribers[evt].splice(index, 1);

        return true;
    }

    /**
     * 이벤트 발행
     *
     * @param evt
     * @param data
     * @memberof PubSub
     */
    publish(evt: string, data: any = {}) {
        const self = this;

        const { subscribers } = self;

        /* 구독 중인 이벤트 컬렉션이 없는 경우 */
        if (!subscribers[evt]) {
            console.error(`${evt} is not subscribed.`);
            return false;
        }

        /* 이벤트 컬렉션에서 구독 중인 이벤트 발행 */
        subscribers[evt].forEach((subscriberCallback: any) => {
            try {
                subscriberCallback(data);
            } catch (e) {
                console.log(e);
            }
        });

        return true;
    }
}
