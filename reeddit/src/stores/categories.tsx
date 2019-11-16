import {flow, types} from "mobx-state-tree"

const Category = types.model("Category", {
  id: types.identifier,
  display_name: types.optional(types.string, ""),
  title: types.optional(types.string, ""),
  slug: types.optional(types.string, ""),
  created_at: types.optional(types.Date, Date.now()),
}).actions(self => ({
  fetchCategories: flow(function* fetchCategories() {

  })
  })

)

export default Category;
