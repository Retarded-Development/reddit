import { types } from "mobx-state-tree"

const User = types.model("User", {
  id: types.identifier,
  email: types.optional(types.string, ""),
  username: types.optional(types.string, ""),
  is_logined: types.optional(types.boolean, false),
})

export default User;
