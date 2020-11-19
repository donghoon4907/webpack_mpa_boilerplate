import { MODEL } from "../store/model";
import { User } from "./user_card";
import { Post } from "./post_card";

type Data = User & Post;

export default abstract class Template {
    /* State model */
    protected abstract readonly _model: MODEL;

    abstract template: (data: Data) => string;

    get model() {
        return this._model;
    }
}
