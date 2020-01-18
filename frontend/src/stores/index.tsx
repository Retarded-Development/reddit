import {UserStore} from "./user"
// import {Instance, unprotect, castToSnapshot} from "mobx-state-tree";
import { useContext, createContext } from "react";

import {CategoriesStore} from "../stores/categories";
import {RootStore} from "./rootStore";
import {Instance} from "mobx-state-tree";

type RootStoreModel = Instance<typeof RootStore>;

export const createStore = (): RootStoreModel => {
  const user = {id: 0};
  const categories = {cats:[], byId: {}};
  const submission = {id:0};
  const category = {id:0};

  return RootStore.create({ user, categories, submission, category});
};

// context to pass in compenents
const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
