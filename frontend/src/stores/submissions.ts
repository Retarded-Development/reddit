import {types} from "mobx-state-tree";
import Comment from "./comments";

const Submission = types.model("Submission", {
    id: types.identifier,
    author: types.optional(types.string, ""),
    category: types.optional(types.string, ""),
    url: types.optional(types.string, ""),
    text: types.optional(types.string, ""),
    text_html: types.optional(types.string, ""),
    ups: types.optional(types.integer, 0),
    downs: types.optional(types.integer, 0),
    score: types.optional(types.integer, 0),
    comment_count: types.optional(types.integer, 0),
    created_at: types.optional(types.Date, 0),
    comments: types.array(Comment),
});

const Submissions = types.model("Submissions", {
});


export { Submission, Submissions };