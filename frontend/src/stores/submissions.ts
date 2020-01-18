import {types} from "mobx-state-tree";
import Comment from "./comments";
import {MinimalUser} from "./user";
import {Category} from "./categories";
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
    created_at: types.optional(types.Date, 0),
    category: types.late(() => types.maybe(Category)),
    comments: types.maybeNull(types.array(types.reference(Comment))),
});


export { Submission };