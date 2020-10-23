import Component from "../lib/component";
import store from "../store";
import { REMOVE_SEARCH_USER } from "../store/actions";
import user from "../../pug/templates/user.pug";
import none from "../../pug/templates/none.pug";

/**
 * 사용자 검색 목록 컴포넌트
 *
 */
export default class List extends Component {
    constructor() {
        /* 부모 컴포넌트까지 전달 */
        super({
            store,
            $elem: document.querySelector("[data-js=list]")
        });

        this.bindEvt();
    }

    /**
     * bind events
     *
     */
    bindEvt() {
        let self = this;

        /* 목록 제거 */
        window.onclick = (evt) => {
            const { dataset } = evt.target;
            if (dataset.btn === "remove") {
                self.handleRemoveItem(+dataset.key);
            }
        };
    }

    /**
     * remover
     *
     * @param {number} index
     */
    handleRemoveItem(index) {
        store.dispatch(REMOVE_SEARCH_USER, { index });
    }

    /**
     * renderer
     *
     */
    render() {
        let self = this;

        const { users } = store.state;

        let template;
        if (users.length === 0) {
            template = none;
        } else {
            template = user;
        }

        self.$elem.innerHTML = template({ users });
    }
}
