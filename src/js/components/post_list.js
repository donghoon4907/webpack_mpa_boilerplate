import List from "../lib/list";
import { TYPE_POST } from "../store/types";
import template from "../../pug/templates/post.pug";
import skeleton from "../../pug/templates/post_skeleton.pug";

/**
 * post list component
 *
 * @property {string} type
 * @property {object} template
 * @property {object} skeleton
 * @property {object} selector
 */
export default class PostList extends List {
    constructor() {
        super({
            type: TYPE_POST
        });

        this.type = TYPE_POST;

        this.template = template;

        this.skeleton = skeleton;

        this.selector = {
            wrapper: `[data-js='${this.type}']`,
            skeleton: `[data-js='${this.type}-skeleton']`
        };
    }

    /**
     * bind events
     *
     * @memberof PostList
     */
    bindEvt() {}
}
