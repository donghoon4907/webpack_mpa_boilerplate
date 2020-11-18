import { Loader } from "../interface/loader";
import userSkeleton from "../../pug/templates/user_skeleton.pug";
import postSkeleton from "../../pug/templates/post_skeleton.pug";

export class UserSkeletonLoader implements Loader {
    template() {
        return userSkeleton();
    }
}

export class postSkeletonLoader implements Loader {
    template() {
        return postSkeleton();
    }
}
