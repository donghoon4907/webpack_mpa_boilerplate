import Loader from "./loader";
import userSkeleton from "../../pug/templates/user_skeleton.pug";

export default class UserSkeletonLoader extends Loader {
    /**
     * Skeleton loader component for `User` model
     *
     * @param    _count
     * @property `template`
     */
    constructor(protected _count: number) {
        super();
    }

    template = () => {
        const { _count: count } = this;

        return userSkeleton({ count });
    };
}
