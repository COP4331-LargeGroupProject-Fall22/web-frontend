<template>
  <div class="row">
    <div class="col-md-2">
      <nav id="sidebarMenu" class="sidebar">
        <div class="position-sticky">
          <button @click="currentTab = 'IngredientFeed'">
            <font-awesome-icon icon="carrot" />My Ingredients
          </button>
          <button @click="currentTab = 'RecipeFeed'">
            <font-awesome-icon icon="hamburger" />Recipes
          </button>
          <button @click="currentTab = 'ShoppingListFeed'">
            <font-awesome-icon icon="shopping-cart" />Shopping Cart
          </button>
        </div>
      </nav>
    </div>
    <div class="col-md-10">
      <div class="container">
        <component :is="currentTab"></component>
      </div>
    </div>
  </div>
</template>

<script>
import IngredientFeed from "@/components/IngredientFeed.vue";
import RecipeFeed from "@/components/RecipeFeed.vue";
import ShoppingListFeed from "@/components/ShoppingListFeed.vue";
export default {
  name: "HomeView",
  components: {
    IngredientFeed,
    RecipeFeed,
    ShoppingListFeed,
  },
  data() {
    return {
      currentTab: "IngredientFeed",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (!this.loggedIn) {
      this.$router.push("/login");
    }
  },
};
</script>
<!-- TODO(#16): set script to have the inital tab (IngredientFeed) button active -->
<!-- TODO(#17): remove App.vue routing and routing in router.js for everything other than home-->
<!-- TODO(#9): replace this icon with the ones we're using in the figma diagrams -->

<style scoped>
.container {
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100%;
}

.col-md-2,
.col-md-10 {
  padding: 0;
}

.list-group {
  margin: 0 !important;
}

.sectionicons {
  margin-right: 10px;
}

.pb-2,
.py-2 {
  padding: 1.5rem !important;
  margin: 0 !important;
}

button {
  width: 100%;
  padding: 20px;
  border: none;
  background-color: white;
  text-align: left;
}

button.active,
button:active,
button:hover,
button:focus,
button:target {
  color: green;
  font-weight: bold;
}

.svg-inline--fa {
  margin-right: 10px;
  font-size: 20px;
}
</style>
