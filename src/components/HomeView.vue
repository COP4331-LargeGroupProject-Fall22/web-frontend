<template>
  <div class="row">
    <div class="col-md-2">
      <nav id="sidebarMenu" class="sidebar">
        <div class="position-sticky">
          <button
            @click="currentTab = 'IngredientFeed'"
            v-bind:class="{
              white: currentTab != 'IngredientFeed',
              green: currentTab == 'IngredientFeed',
            }"
          >
            <font-awesome-icon icon="carrot" />My Ingredients
          </button>
          <button
            @click="currentTab = 'RecipeFeed'"
            v-bind:class="{
              white: currentTab != 'RecipeFeed',
              green: currentTab == 'RecipeFeed',
            }"
          >
            <font-awesome-icon icon="hamburger" />Recipes
          </button>
          <button
            @click="currentTab = 'ShoppingListFeed'"
            v-bind:class="{
              white: currentTab != 'ShoppingListFeed',
              green: currentTab == 'ShoppingListFeed',
            }"
          >
            <font-awesome-icon icon="shopping-cart" />Shopping List
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

<style scoped>
@import "css/HomeView.css";
</style>
