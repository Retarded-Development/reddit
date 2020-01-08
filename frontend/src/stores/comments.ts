import {flow, types} from "mobx-state-tree"
import User from "./user";

const Comment = types.model("Comment", {
    id: types.identifier,
    author: types.reference(User),
    parent: types.maybeNull(types.integer),
    children_array: types.maybeNull(types.array(types.integer)),
    raw_comment: types.optional(types.string, ""),
    html_comment: types.optional(types.string, ""),
    ups: types.optional(types.integer, 0),
    downs: types.optional(types.integer, 0),
    score: types.optional(types.integer, 0),
    created_at: types.optional(types.Date, 0),
});


export default Comment