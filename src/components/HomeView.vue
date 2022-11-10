<template>
  <div class="row">
    <div class="col-md-2">
      <nav id="sidebarMenu" class="sidebar">
        <div class="position-sticky">
          <!-- array of buttons but cant set different icons
          <button
              v-for="tab in tabs"
              :key="tab"
              :class="['tab-button', { active: currentTab === tab }]"
              @click="currentTab = tab"
            >
            {{ tab }}
          </button> -->
          <button @click="currentTab = 'IngredientFeed'">
            <font-awesome-icon icon="carrot" style="margin-right: 10px; font-size: 20px"/>My Ingredients</button>
          <button @click="currentTab = 'RecipeFeed'">
            <font-awesome-icon icon="hamburger" style="margin-right: 10px; font-size: 20px"/>Recipes</button>
          <button @click="currentTab = 'ShoppingListFeed'">
            <font-awesome-icon icon="shopping-cart" style="margin-right: 10px; font-size: 20px"/>Shopping Cart</button>
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
// import UserService from "../services/user.service";
import IngredientFeed from '@/components/IngredientFeed.vue'
import RecipeFeed from '@/components/RecipeFeed.vue'
import ShoppingListFeed from '@/components/ShoppingListFeed.vue'
export default {
  name: "HomeView",
  components: {
    IngredientFeed,
    RecipeFeed,
    ShoppingListFeed
  },
  data() {
    return {
      currentTab: 'IngredientFeed',
      // tabs: ['IngredientFeed', 'RecipeFeed', 'ShoppingListFeed']
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
    // UserService.getPublicContent().then(
    //   (response) => {
    //     this.content = response.data;
    //   },
    //   (error) => {
    //     this.content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
  },
};
</script>
<!-- TODO: remove unnessesary comments -->
<!-- TODO: fix css to keep button active when clicked off, it was until it suddenly stopped -->
<!-- TODO: set script to have the inital tab (IngredientFeed) button active -->
<!-- TODO: remove App.vue routing and routing in router.js for everything other than home-->
<!-- TODO(#9): replace this icon with the ones we're using in the figma diagrams -->

<style scoped>

.container{
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100%;
}
.col-md-2, .col-md-10{
  padding: 0;
}

.list-group{
  margin: 0 !important;
}

.sectionicons{
  margin-right: 10px;
}
.pb-2, .py-2{
  padding: 1.5rem !important;
  margin: 0 !important;
}

button{
  width: 100%;
  padding: 20px;
  border: none;
  background-color: white;
  text-align: left;
}

button.active, button:active, button:hover, button:focus, button:target{
  color: green;
  font-weight: bold;
}
</style>
