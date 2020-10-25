import Store from "../store/store";

/**
 * Connect store
 *
 * @property {object} render
 * @property {string} type   - subscribe key
 */
export default class Component {
    constructor(props = {}) {
        let self = this;

        self.render = self.render || function () {};

        self.type = props.type || null;

        if (!self.type) {
            throw new Error("type is not found in props");
        }

        if (props.store instanceof Store) {
            props.store.events.subscribe(self.type, () => self.render());
        }
    }
}
