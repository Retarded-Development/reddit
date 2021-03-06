import {flow, types} from "mobx-state-tree";
import {Comment} from "./comments";
import {MinimalUser} from "./user";
import {Category} from "./categories";
import {values} from "mobx";
import {type} from "os";

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
});

const SubmissionStore = types
    .model("SubmissionStore", {
        submission: types.maybe(Submission),
        active_reply: types.optional(types.integer, 0),
        loading: types.optional(types.boolean, false),
        loading_error: types.optional(types.string, ""),
        loading_errors: types.frozen(),
        comments: types.optional(types.map(Comment), {}),
        comments_first_column: types.optional(types.array(types.integer), [])
    })
    .actions(self => ({
        changeActiveReply: function(comment_id: number){
            self.active_reply = comment_id;
        },
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
                }
                for (let i = 1; i < 10; i++){
                    const url = "/api/comments/?submission=" + id + "&page="+ String(i);
                    const response2 = yield fetch(
                        url,
                        {
                            method: "GET",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            }
                        }
                    );

                    const dataJson2 = yield response2.json();
                    if ('detail' in dataJson2){
                        return
                    }
                    let data2 = dataJson2.results;
                    console.log(dataJson2);
                    console.log(data2);
                    data2.forEach(function(element: any) {
                        element.created_at = new Date(element.created_at);
                        if (element.category) {
                            element.category.created_at = new Date(element.category.created_at);
                        }
                        self.comments.put(element);
                        console.log(element.parent);
                        if (element.parent){
                            self.comments.get(element.parent)?.children.push(element.id);

                        }
                    });
                    // self.comments.values().forEach(el => el?.children === [])self.comments.values().forEach(el => el?.children === [])
                    console.log(data2);
                    if (data2.next === null){
                        break
                    }
                    self.loading = false;
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
                self.loading_error = error;
                // self.loading_errors = Object.freeze(data);
            }
        })
    }));

;


export { Submission, SubmissionStore};