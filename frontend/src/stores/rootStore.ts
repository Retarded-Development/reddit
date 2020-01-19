import {Instance, types} from "mobx-state-tree";
import {UserStore} from "./user";
import {CategoriesStore, CategoryStore} from "./categories";
import {SubmissionStore} from "./submissions";

const RootStore = types.model("RootStore", {
    user: UserStore,
    categories: CategoriesStore,
    category: CategoryStore,
    submission: SubmissionStore,
    // add more stores here
});
export {RootStore};