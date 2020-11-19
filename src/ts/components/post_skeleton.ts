import Loader from "./loader";
import postSkeleton from "../../pug/templates/post_skeleton.pug";

export default class PostSkeletonLoader extends Loader {
    /**
     * Skeleton loader component for `Post` model
     *
     * @param {number} _count Loader count
     * @property {() => string} template
     */
    constructor(protected _count: number) {
        super();
    }

    template = () => {
        const { _count: count } = this;

        return postSkeleton({ count });
    };
}
