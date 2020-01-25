import { flow, getParent, types } from "mobx-state-tree";
import { MinimalUser } from "./user";

import { Instance } from "mobx-state-tree";
import axios from "axios";
import { Submission } from "./submissions";
import {Comment} from "./comments";
import { getEnabledCategories } from "trace_events";
import { RootStore } from "./rootStore";

type RootStoreModel = Instance<typeof RootStore>;

const Category = types.model("Category", {
  id: types.maybe(types.identifierNumber),
  display_name: types.optional(types.string, ""),
  title: types.optional(types.string, ""),
  slug: types.optional(types.string, ""),
  created_at: types.optional(types.Date, Date.now()),
  author: types.maybeNull(MinimalUser),
});

const CategoryStore = types
  .model("CategoryStore", {
    category: types.maybe(Category),
    loading: types.optional(types.boolean, false),
    loading_error: types.optional(types.string, ""),
    loading_errors: types.frozen(),
    curent_page: types.optional(types.integer, 1),
    total: types.optional(types.integer, 10),
    submissions: types.late(() => types.optional(types.array(Submission), []))
  })
  .actions(self => ({
    getById: flow(function* getById(id, page=1) {
      try {
        // self.loading = true;
        const response = yield fetch("/api/categories/?slug=" + id, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        const dataJson = yield response.json();
        const data = dataJson.results[0];
          console.log(data);
        // let data = dataJson.data;
        if (data.created_at) {
          data.created_at = new Date(data.created_at);
        }

        if ("id" in data) {
          self.category = data;

        }
        const response2 = yield fetch(
          "/api/submissions/?category__slug=" + id + "&page=" + String(page),
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }
        );
        const dataJson2 = yield response2.json();
        let data2 = dataJson2.results;
        data2.forEach(function(element: any) {
          element.created_at = new Date(element.created_at);
          if (element.category) {
            element.category.created_at = new Date(element.category.created_at);
          }
        });
        self.submissions = data2;
        self.loading = false;
        self.total = dataJson2.count;

      } catch (error) {
        console.error("Failed to fetch projects", error);
        self.loading_error = error;
        // self.loading_errors = Object.freeze(data);
      }
    })
  }));


const CategoriesStore = types
  .model("CategoriesStore", {
    cats: types.array(Category),
    curent_page: types.optional(types.integer, 1),
    total: types.optional(types.integer, 10),
    loading: types.optional(types.boolean, false),
    loading_error: types.optional(types.string, ""),
    loading_errors: types.frozen()
  })
  .actions(self => ({
    getAll: flow(function* getAll(page=1) {
      // <- note the star, this a generator function!
      console.log("getAll()");
      try {
        const response = yield fetch("/api/categories/?page="+ String(page), {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        const data = yield response.json();
        data.results.forEach(
          (element: any) => (element.created_at = new Date(element.created_at))
        );
        self.cats = data.results;
        self.total = data.count;
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    })
  }));

export { CategoriesStore, CategoryStore , Category};
