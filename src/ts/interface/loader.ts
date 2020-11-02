import { MODEL } from "../store/model";

export interface Loadable {
    showLoader: () => this;
    hideLoader: () => this;
}

export interface Loader {
    show: (type: MODEL) => Promise<this>;
    hide: (type: MODEL) => this;
}
