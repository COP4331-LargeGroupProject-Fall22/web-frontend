import { createStore } from "vuex";
import { auth } from "./auth.module";
import { ingredients } from "./ingredients.module";
import { inventory } from "./inventory.module";

const store = createStore({
  modules: {
    auth,
    ingredients,
    inventory,
  },
});

export default store;