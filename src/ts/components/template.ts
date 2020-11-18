import { MODEL } from "../store/model";
import { User } from "./user_card";
import { Post } from "./post_card";

type Data = User & Post;

export default abstract class Template {
    /* status model */
    protected abstract readonly _model: MODEL;

    /**
     * template
     *
     * @memberof Template
     */
    abstract template: (data: Data) => string;

    /**
     * get model
     *
     * @memberof Template
     */
    get model() {
        return this._model;
    }
}
