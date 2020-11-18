import Template from "../components/template";
import { MODEL } from "../store/model";
import template from "../../pug/templates/user.pug";

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    title: string;
};

export default class UserCard extends Template {
    /* state model */
    _model: MODEL = MODEL.USER;
    /**
     * Card component for `User` model
     *
     * @property `template`
     */
    constructor() {
        super();
    }

    /**
     * template
     *
     * @memberof PostCard
     */
    template = (data: User) => template({ ...data });
}
