import {flow, types} from "mobx-state-tree"

const User = types.model("User", {
  id: types.identifier,
  email: types.optional(types.string, ""),
  username: types.optional(types.string, ""),
  is_logined: types.optional(types.boolean, false),
  is_registered: types.optional(types.boolean, false),
  JWTtoken: types.optional(types.string, ""),

  loading: types.optional(types.boolean, false),
  loading_error: types.optional(types.string, ""),
  loading_errors: types.frozen(),
})
   .actions(self => ({
        loginUser: flow(function* loginUser(formData) { // <- note the star, this a generator function!
            self.loading = true;
            console.log(formData);

            try {
                const response = yield fetch('/api/jwt/create', {
                    method: 'POST',
                      headers: {
                      'Accept': 'application/json',
                        'Content-Type': 'application/json'
    },
                    body: JSON.stringify(formData)
                });
                const data = yield response.json();

                // self.username = formData.username
                // self. = formData.username
                console.log(data);
                if(data.hasOwnProperty('detail')){
                    self.loading_error = data.detail;
                } else {
                    self.JWTtoken = data.access;
                }
                self.is_logined = true;
                self.loading = false;
            } catch (error) {
                console.error("Failed to fetch projects", error);
                self.loading = false;
            }
        }),
       registerUser: flow(function* loginUser(formData) {
           console.log(formData);
           self.loading = true;
           try {
               const response = yield fetch("/api/users/", {
                   method: 'POST',
                   headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(formData)
               });
               const data = yield response.json();
               console.log(data);
               if(data.hasOwnProperty('id')){
                   self.is_registered = true;
               } else {
                   self.loading_errors = Object.freeze(data);
               }
               self.loading = false;
           } catch (error) {
               console.error("Failed to fetch projects", error);
               self.loading = false;
           }

       })
    }));



export default User;
