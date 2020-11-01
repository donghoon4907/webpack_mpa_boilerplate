import Total from "../lib/total";
import { MODEL } from "../store/model";

export default class PostTotal extends Total {
    /**
     *
     * @constructor
     */
    constructor() {
        super(MODEL.POST);
    }
}
