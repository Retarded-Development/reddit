import {Instance, types} from "mobx-state-tree";
import {UserStore} from "./user";
import {CategoriesStore, CategoryStore} from "./categories";
import {Submission} from "./submissions";

const RootStore = types.model("RootStore", {
    user: UserStore,
    categories: CategoriesStore,
    category: CategoryStore,
    submission: Submission,
    // add more stores here
});
export {RootStore};