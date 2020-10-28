import Store from "../store/store";

/**
 * Connect store
 *
 */
export default class Component {
    constructor({ store, type }) {
        let self = this;

        self.render = self.render || function () {};

        if (store instanceof Store) {
            store.events.subscribe(type, () => self.render());
        }
    }
}
