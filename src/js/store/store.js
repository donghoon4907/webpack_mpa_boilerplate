import PubSub from "../lib/pubsub.js";

/**
 * 상태 관리 모듈
 *
 * @property {object} actions   - action 관리 컬렉션
 * @property {object} mutations - mutation 관리 컬렉션
 * @property {object} state     - 상태 관리 컬렉션
 * @property {string} status    - 작업 상태 관리
 * @property {function} events  - pubsub module instance
 */
export default class Store {
    constructor(params) {
        let self = this;

        this.actions = {};
        this.mutations = {};
        this.state = {};
        this.status = "resting";
        this.events = new PubSub();

        /* action 컬렉션을 전달 받은 경우 업데이트 */
        if (params["actions"]) {
            this.actions = params.actions;
        }

        /* mutation 컬렉션을 전달 받은 경우 업데이트 */
        if (params["mutations"]) {
            this.mutations = params.mutations;
        }

        /* 상태 감시 모듈 활성화 */
        this.state = new Proxy(params.initialState || {}, {
            /**
             * 상태 변경을 감시
             */
            set: function (state, key, value) {
                /* 상태 변경 */
                state[key] = value;

                const { type } = value;

                if (!type) {
                    throw new Error("type is not defined in new state");
                }

                /* 상태 변경 이벤트 발행 */
                self.events.publish(type, self.state);

                if (self.status !== "mutation") {
                    console.warn(`You should use a mutation to set ${key}`);
                }

                /* 다음 작업을 위해 작업 상태 재설정 */
                self.status = "resting";

                return true;
            }
        });
    }

    /**
     * action dispatcher
     *
     * @param {string} actionKey
     * @param {*} payload
     * @returns {boolean}
     * @memberof Store
     */
    dispatch(actionKey, payload) {
        let self = this;

        /* 관리 대상이 아닌 action인 경우 */
        if (typeof self.actions[actionKey] !== "function") {
            console.error(`Action "${actionKey} doesn't exist.`);
            return false;
        }

        /* 로그 그룹 생성 및 저장 */
        console.groupCollapsed(`ACTION: ${actionKey}`);

        /* 작업 상태 변경 */
        self.status = "action";

        /* action 호출*/
        self.actions[actionKey](self, payload);

        /* 로그 그룹 종료 */
        console.groupEnd();

        return true;
    }

    /**
     * state changer
     *
     * @param {string} mutationKey
     * @param {mixed} payload
     * @returns {boolean}
     * @memberof Store
     */
    commit(mutationKey, payload) {
        let self = this;

        /* 관리 대상이 아닌 mutation인 경우 */
        if (typeof self.mutations[mutationKey] !== "function") {
            console.log(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }

        /* 작업 상태 변경 */
        self.status = "mutation";

        /* mutation 작업 후 반환된 새로운 상태 */
        let newState = self.mutations[mutationKey](self.state, payload);

        /* 이전 상태와 새로운 상태를 병합 */
        self.state = Object.assign(self.state, newState);

        console.log(self.state);

        return true;
    }
}
