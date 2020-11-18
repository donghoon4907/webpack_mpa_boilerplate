import { Loader } from "../interfaces/loader";
import postSkeleton from "../../pug/templates/post_skeleton.pug";

export default class PostSkeletonLoader implements Loader {
    /**
     * Skeleton loader component for `Post` model
     *
     * @property `template`
     */
    constructor() {}

    template(count: number) {
        return postSkeleton({ count });
    }
}
