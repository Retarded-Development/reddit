import {flow, types} from "mobx-state-tree";
import Comment from "./comments";
import {MinimalUser} from "./user";
import {Category} from "./categories";

const Submission = types.model("Submission", {
    id: types.identifierNumber,
    author: types.maybeNull(MinimalUser),
    url: types.maybeNull(types.string),
    text: types.optional(types.string, ""),
    title: types.optional(types.string, ""),
    text_html: types.optional(types.string, ""),
    ups: types.optional(types.integer, 0),
    downs: types.optional(types.integer, 0),
    score: types.optional(types.integer, 0),
    comment_count: types.optional(types.integer, 0),
    created_at: types.optional(types.Date, new Date()),
    category: types.late(() => types.maybe(Category)),
    comments: types.maybeNull(types.array(Comment)),
});

const SubmissionStore = types
    .model("SubmissionStore", {
        submission: types.maybe(Submission),
        loading: types.optional(types.boolean, false),
        loading_error: types.optional(types.string, ""),
        loading_errors: types.frozen(),
    })
    .actions(self => ({
        getById: flow(function* getById(id) {
            try {
                self.loading = true;
                const response = yield fetch("/api/submissions/?id=" + String(id), {
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
                if (data.category.created_at) {
                    data.category.created_at = new Date(data.created_at);
                }

                if ("id" in data) {
                    self.submission = data;
                    debugger
                }
                const response2 = yield fetch(
                    "/api/comments/?submission=" + id,
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
                console.log(data2);
                data2.forEach(function(element: any) {
                    element.created_at = new Date(element.created_at);
                    if (element.category) {
                        element.category.created_at = new Date(element.category.created_at);
                    }
                });
                if (self.submission){
                    self.submission.comments = data2;
                }
                self.loading = false;
            } catch (error) {
                console.error("Failed to fetch projects", error);
                self.loading_error = error;
                // self.loading_errors = Object.freeze(data);
            }
        })
    }));

;


export { Submission, SubmissionStore};