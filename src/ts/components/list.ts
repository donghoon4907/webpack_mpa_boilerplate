import { Render } from "../interfaces/render";
import { MODEL } from "../store/model";
import store from "../store";

export default abstract class List implements Render {
    /**
     *
     * @constructor
     * @param _model
     */
    constructor(protected readonly _model: MODEL) {
        store.events.subscribe(_model, (state: any) => this.render(state));
    }

    /**
     * bind event
     *
     * @memberof List
     */
    abstract bindEvt: () => void;

    /**
     * show loader
     *
     * @memberof List
     */
    abstract showLoader: () => void;

    /**
     * hide loader
     *
     * @memberof List
     */
    abstract hideLoader: () => void;

    /**
     * renderer
     *
     * @memberof List
     */
    abstract render: (state: any) => void;

    /**
     * get model
     *
     * @memberof List
     */
    get model() {
        return this._model;
    }
}
