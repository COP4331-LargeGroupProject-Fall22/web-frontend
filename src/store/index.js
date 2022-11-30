import { createStore } from "vuex";
import { auth } from "./auth.module";
import { ingredients } from "./ingredients.module";
import { inventory } from "./inventory.module";
import { shoppinglist } from "./shoppinglist.module";

const store = createStore({
  modules: {
    auth,
    ingredients,
    inventory,
    shoppinglist,
  },
});

export default store;
