import Template from "./template";
import { User } from "./user_card";
import { MODEL } from "../store/model";
import template from "../../pug/templates/post.pug";

export type Post = {
    id: string;
    image: string;
    likes: number;
    link: string | null;
    owner: User;
    publishDate: string;
    tags: string[];
    text: string;
};

export default class PostCard extends Template {
    _model: MODEL = MODEL.POST;
    /**
     * Card component for `Post` model
     *
     * @property `template`
     */
    constructor() {
        super();
    }

    template = (data: Post) => template({ ...data });
}
