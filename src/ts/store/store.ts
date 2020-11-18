import PubSub from "../libs/pubsub";

export default class Store {
    /* 등록한 액션 함수 */
    private actions: any;
    /* 등록한 뮤테이션 함수 */
    private mutations: any;
    /* 전역 상태 객체 */
    public state: any;
    /* 작업 상태 */
    private status: string;
    /* pub / sub */
    public events: PubSub;
    /* 작업 큐 */
    private queue: Array<string>;

    constructor(params: any) {
        let self = this;

        this.actions = {};

        this.mutations = {};

        this.state = {};

        this.status = "resting";

        this.events = new PubSub();

        this.queue = [];

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
            set: function (state: any, key: string, value: any) {
                /* 상태 변경 */
                state[key] = value;

                console.log(`STATE_CHANGE: ${key}`);

                /* 상태 변경 이벤트 발행 */
                self.events.publish(key, self.state);

                return true;
            }
        });
    }

    /**
     * action dispatcher
     *
     * @param actionKey
     * @param payload
     * @memberof Store
     */
    dispatch(actionKey: string, payload: any, showLoader?: () => void) {
        const self = this;

        /* 관리 대상이 아닌 action인 경우 */
        if (typeof self.actions[actionKey] !== "function") {
            console.error(`Action "${actionKey} doesn't exist.`);
            return false;
        }

        /* 같은 작업 검증 */
        if (self.status !== "resting") {
            const isWorking = self.queue.indexOf(actionKey);
            if (isWorking !== -1) {
                console.error(`Action "${actionKey} is not finished yet`);
                return false;
            }
        }

        /* 로딩 UI 보이기 */
        if (typeof showLoader === "function") {
            showLoader();
        }

        /* 작업 상태 변경 */
        self.status = "action";

        /* 작업 중 목록에 추가 */
        self.queue.push(actionKey);

        /* action 호출 */
        self.actions[actionKey](self, payload);
    }

    /**
     * state changer
     *
     * @param mutationKey
     * @param payload
     * @memberof Store
     */
    async commit(mutationKey: string, payload: any) {
        const self = this;

        /* 관리 대상이 아닌 mutation인 경우 */
        if (typeof self.mutations[mutationKey] !== "function") {
            console.log(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }

        /* 로그 그룹 생성 및 저장 */
        console.group(`ACTION: ${mutationKey}`);

        /* 작업 상태 변경 */
        self.status = "mutation";

        /* mutation 요청 */
        const newState = await self.mutations[mutationKey](self.state, payload);

        console.log(newState);

        /* 다음 작업을 위해 작업 상태 재설정 */
        self.status = "resting";

        /* 작업 중 목록에서 제거 */
        self.queue.splice(self.queue.indexOf(mutationKey), 1);

        /* 로그 그룹 종료 */
        console.groupEnd();
    }
}
