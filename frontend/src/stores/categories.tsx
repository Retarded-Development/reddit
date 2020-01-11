import {flow, types} from "mobx-state-tree"
import User from "./user";

import {Instance} from "mobx-state-tree";

const Category = types.model("Category", {
  id: types.identifierNumber,
  display_name: types.optional(types.string, ""),
  title: types.optional(types.string, ""),
  slug: types.optional(types.string, ""),
  created_at: types.optional(types.Date, Date.now()),
  author: types.maybeNull(types.integer),
});

const Categories = types.model("Category", {
  cats: types.array(Category),
}).actions(
    self => ({
      getAll: flow(function* getAll() { // <- note the star, this a generator function!
        console.log("getAll()");
        try {
          const response = yield fetch('/api/categories/', {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          });
          const data = yield response.json();

          console.log(data);
          data.forEach(
              (element:any) => element.created_at = new Date(element.created_at)
          );
          self.cats.push(...data);

          // self.cats.map(item => self.byId.set(String(item.id), item));

        } catch (error) {
          console.error("Failed to fetch projects", error);
        }
      }),
      getById: flow(function* getById(id) {
        try {
          const response = yield fetch('/api/categories/' + String(id), {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          });
          const data = yield response.json();
          console.log(data);
          const category = Category.create(data);
          // self.byId.set(id, category);
          return category;

        } catch (error) {
          console.error("Failed to fetch projects", error);
        }
      })
    }));
export default Categories;
