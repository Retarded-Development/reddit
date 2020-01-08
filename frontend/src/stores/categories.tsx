import {flow, types} from "mobx-state-tree"
import User from "./user";

const Category = types.model("Category", {
  id: types.identifier,
  display_name: types.optional(types.string, ""),
  title: types.optional(types.string, ""),
  slug: types.optional(types.string, ""),
  created_at: types.optional(types.Date, Date.now()),
  author: types.maybeNull(types.reference(User)),
});

const Categories = types.model("Category", {
});
export default Categories;
