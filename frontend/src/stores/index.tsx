import User from "./user"

import {types, Instance, unprotect, castToSnapshot} from "mobx-state-tree";

import { useContext, createContext } from "react";
import {Submissions} from "./submissions";

import { cast } from "mobx-state-tree";
import { Category, Categories} from "../stores/categories";

export type RootStoreModel = Instance<typeof RootStore>;

const RootStore = types.model("RootStore", {
  user: User,
  submissions: Submissions,
  categories: Categories,
  // add more stores here

});


export const createStore = (): RootStoreModel => {
  const user = User.create({
    id: " ",
    email: "",
    is_logined: false,
    username: "",
    loading_error: "",
    loading_errors: cast({})
  });
  const submissions = Submissions.create({});
  const categories = Categories.create({cats:[], byId: {}});
  categories.getAll();
  
  // @ts-ignore
  return RootStore.create({ user, submissions, categories });
};

// context to pass in compenents
const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
