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
        if (!evt) {
            throw new Error("evt is not defined");
        }

        /* 이벤트 컬렉션이 구성되지 않은 경우 새로운 컬렉션을 추가 */
        if (!subscribers[evt]) {
            subscribers[evt] = [];
        }

        /* 이벤트 컬렉션에 추가 및 추가된 이벤트의 인덱스 정보 */
        const index = subscribers[evt].push(callback) - 1;

        return {
            /**
             * 이벤트 구독 취소
             */
            unsubscribe: function () {
                subscribers[evt].splice(index, 1);
            }
        };
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
            throw new Error(`${evt} is not subscribed.`);
        }

        /* 이벤트 컬렉션에서 구독 중인 이벤트 발행 */
        subscribers[evt].forEach((subscriberCallback: any) => {
            try {
                subscriberCallback(data);
            } catch (e) {
                console.log(e);
            }
        });
    }
}
