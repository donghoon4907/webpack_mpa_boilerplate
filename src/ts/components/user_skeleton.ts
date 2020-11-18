import { Loader } from "../interfaces/loader";
import userSkeleton from "../../pug/templates/user_skeleton.pug";

export default class UserSkeletonLoader implements Loader {
    /**
     * Skeleton loader component for `User` model
     *
     * @property `template`
     */
    constructor() {}

    template(count: number) {
        return userSkeleton({ count });
    }
}
