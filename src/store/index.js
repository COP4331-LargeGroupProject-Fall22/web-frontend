import { createStore } from "vuex";
import { auth } from "./auth.module";
import { ingredients } from "./ingredients.module";

const store = createStore({
  modules: {
    auth,
    ingredients,
  },
});

export default store;