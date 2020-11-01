import Total from "../lib/total";
import { MODEL } from "../store/model";

export default class UserTotal extends Total {
    /**
     *
     * @constructor
     */
    constructor() {
        super(MODEL.USER);
    }
}
