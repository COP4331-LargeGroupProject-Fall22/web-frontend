import { createStore } from "vuex";
import { auth } from "./auth.module";
import { favrecipe } from "./favrecipe.module";
import { ingredients } from "./ingredients.module";
import { inventory } from "./inventory.module";
import { recipe } from "./recipe.module";
import { shoppinglist } from "./shoppinglist.module";

const store = createStore({
  modules: {
    auth,
    favrecipe,
    ingredients,
    inventory,
    recipe,
    shoppinglist,
  },
});

export default store;
