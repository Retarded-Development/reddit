import {flow, types} from "mobx-state-tree"
import User from "./user";

import {Instance} from "mobx-state-tree";
import axios from "axios"


const Category = types.model("Category", {
  id: types.identifierNumber,
  display_name: types.optional(types.string, ""),
  title: types.optional(types.string, ""),
  slug: types.optional(types.string, ""),
  created_at: types.optional(types.Date, Date.now()),
  author: types.maybeNull(types.integer),
});
type CategoryType = Instance<typeof Category>;

const Categories = types.model("Category", {
  cats: types.array(Category),
  // @ts-ignore
  byId: types.map(Category),
  // items: types.optional(types.map(Category), {}),
  loading: types.optional(types.boolean, false),
  loading_error: types.optional(types.string, ""),
  loading_errors: types.frozen(),

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
          self.loading = true;
          const response = yield fetch('/api/categories/' + String(id), {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          });
          const data = yield response.json();
          data.created_at = new Date(data.created_at);
          console.log(data);
          const category = Category.create(data);
          self.byId.set(id, category);
          self.loading = false;

        } catch (error) {
          console.error("Failed to fetch projects", error);
          self.loading_error = error;
          // self.loading_errors = Object.freeze(data);
        }
      })
    }));

export { Categories, Category} ;
