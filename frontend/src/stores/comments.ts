import {flow, Instance, types} from "mobx-state-tree"
import {MinimalUser} from "./user";

const Comment = types.model("Comment", {
    id: types.identifierNumber,
    author: types.maybeNull(MinimalUser),
    raw_comment: types.optional(types.string, ""),
    html_comment: types.optional(types.string, ""),
    ups: types.optional(types.integer, 0),
    downs: types.optional(types.integer, 0),
    score: types.optional(types.integer, 0),
    created_at: types.optional(types.Date, 0),
    parent: types.maybeNull(types.integer),
    children: types.optional(types.array(types.integer), []),
    opened: false,
    opened_tree: false,
}).actions(self =>({
    toggle: function(){
        self.opened = !self.opened;
    },
    toggleTree: function(){
        self.opened_tree = !self.opened_tree;
    },

}));

export { Comment };