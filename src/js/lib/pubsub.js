export default class PubSub {
    constructor() {
        this.subscribers = {};
    }

    /**
     * 이벤트 구독
     *
     * @param {string} evt
     * @param {function} callback
     * @returns {object} obj.unsubscribe 이벤트 구독 취소
     * @memberof PubSub
     */
    subscribe(evt, callback) {
        let self = this;

        const { subscribers } = self;

        /**
         * 이벤트 컬렉션이 구성되지 않은 경우 새로운 컬렉션을 추가
         */
        if (!subscribers[evt]) {
            subscribers[evt] = [];
        }

        /**
         * 이벤트 컬렉션에 추가 및 추가된 이벤트의 인덱스 정보
         */
        const index = subscribers[evt].push(callback) - 1;

        return {
            unsubscribe: function () {
                subscribers[evt].splice(index, 1);
            }
        };
    }

    /**
     * 이벤트 발행
     *
     * @param {string} evt
     * @param {object} [data={}]
     * @memberof PubSub
     */
    publish(evt, data = {}) {
        let self = this;

        const { subscribers } = self;

        /**
         * 구독 중인 이벤트 컬렉션이 없는 경우
         */
        if (!subscribers[evt]) {
            throw new Error(`${evt} is not subscribed.`);
        }

        /**
         * 이벤트 컬렉션에서 구독 중인 이벤트 발행
         */
        subscribers[evt].forEach((subscriberCallback) => {
            try {
                subscriberCallback(data);
            } catch (e) {
                console.log(e);
            }
        });
    }
}
