<template>
  <div class="container">
    <div class="tool-bar">
      <div class="tool-bar-container">
        <!-- TODO(43): Add drop down for sorting, and connect to endpoint for
          sorting results -->
        <button type="button" class="btn">Sort By</button>
      </div>
      <div class="tool-bar-container">
        <div class="form-outline">
          <!-- TODO(38): Fix search text placeholder not showing unless field is active -->
          <input
            id="searchIngredients"
            aria-label="Search"
            autocomplete="off"
            placeholder="Search Inventory..."
            v-model="searchString"
            type="text"
            class="form-control"
          />
        </div>
        <!-- TODO(19) replace with an actual material icon -->
        <button
          type="button"
          class="btn btn-primary btn-floating"
          id="addIngredient"
          @click="showCreateModal = true"
        >
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="container mt-3">
        <div class="row">
          <modal-view
            @closeModal="showCreateModal = false"
            @saveChanges="handleAddToInventory"
            :showModal="showCreateModal"
            :modalTitle="createModalTitle"
            :modalButtonText="createButtonText"
          >
            <component
              :is="add_ingredient_component"
              ref="add_ingredient_ref"
            ></component>
          </modal-view>
        </div>
      </div>
    </div>
    <!-- TODO(20) set up a scroll button -->
    <div class="row">
      <ul>
        <li
          v-for="category in categorizedItems"
          :key="category"
          class="categories"
        >
          <div>
            <div class="col-md-auto">
              <a v-bind:href="'#' + category.name" class="">
                <button type="button" class="btn type-of-food">
                  {{ category.name }}
                </button>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="row">
      <ul>
        <li v-for="category in categorizedItems" :key="category">
          <div>
            <div :id="category.name" class="row">
              <h3>{{ category.name }}</h3>
            </div>
            <div class="row">
              <ul>
                <div v-for="item in category.items" :key="item">
                  <div class="col-md-auto">
                    <button type="button" class="btn food-item">
                      <div class="col-md-auto text-center food-text">
                        {{ item.name }}
                      </div>
                    </button>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ModalView from "@/components/ModalView.vue";
import AddIngredientView from "@/components/AddIngredientView.vue";

import { util } from "@/globals.js";

export default {
  name: "IngredientFeed",
  components: {
    ModalView,
    AddIngredientView,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    categorizedItems() {
      let itemsAsJson = {};
      for (const item of this.inventoryItems) {
        if (!(item.category in itemsAsJson)) {
          itemsAsJson[item.category] = {
            name: item.category,
            items: {},
          };
        }
        itemsAsJson[item.category]["items"][item.name] = item;
      }
      console.log(JSON.stringify(itemsAsJson));
      return itemsAsJson;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      inventoryItems: [],
      searchString: "",
      showCreateModal: false,
      createModalTitle: "Add ingredient to inventory",
      createButtonText: "Add",
      add_ingredient_component: "add-ingredient-view",
    };
  },
  watch: {
    searchString(newVal) {
      // TODO(27): Update this to filter inventory results when this value
      // changes to only match ingredients with this as substring
      console.log("new searchString: ", newVal);
    },
  },
  methods: {
    handleAddToInventory() {
      const newFoods = JSON.parse(
        JSON.stringify(this.$refs.add_ingredient_ref.ingredientsToAdd)
      );
      if (newFoods.length) {
        for (const food of newFoods) {
          this.$store.dispatch("inventory/post", food).then(
            () => {
              this.successful = true;
              this.loading = false;
              this.getInventoryItems();
            },
            (error) => {
              // TODO(add num): Add something to this page for an error message
              // in the event that the fetch fails.
              this.message = util.getErrorString(error);
            }
          );
        }
      }
    },
    getInventoryItems() {
      this.$store.dispatch("inventory/getAll").then(
        (response) => {
          this.inventoryItems = response;
        },
        (error) => {
          this.message = util.getErrorString(error);
        }
      );
    },
  },
  beforeMount() {
    this.getInventoryItems();
  },
};
</script>

<style scoped>
/* TODO(41): Extract css into separate file */
.container {
  padding: 0 !important;
  margin: 0 !important;
  background-color: #f9f9f9;
  max-width: 100%;
}

.btn {
  background-color: white;
  border-radius: 100px;
  box-shadow: 0px 3px 3px #bdbdbd;
}

.tool-bar {
  margin: 0 !important;
  flex-wrap: wrap;
  height: fit-content;
  display: flex;
  justify-content: space-between;
}

.form-outline {
  padding-right: 20px;
}
.form-control {
  border: none;
  border-radius: 100px !important;
  box-shadow: 0px 3px 3px #bdbdbd;
  display: inline-block;
}

.tool-bar-container {
  display: flex;
  padding: 20px;
}

.btn-floating {
  border-radius: 50%;
  height: fit-content;
  align-self: center;
}

.type-of-food {
  width: 10vw;
  height: 5vw;
  border-radius: 15px;
  align-items: center;
  color: black;
  background-color: lightgrey;
  margin: 15px;
}

.food-text {
  text-align: left !important;
  font-size: 1rem;
  color: white;
  top: 30%;
  padding: 8% !important;
}

.type-of-food,
.food-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.food-item {
  width: 12vw;
  height: 19vw;
  border-radius: 15px;
  /* TODO(40): Update this to display the image from the ingredient in inventory */
  background-size: auto;
  background-image: linear-gradient(
      to bottom,
      rgb(255 255 255 / 0%),
      rgb(0 0 0 / 73%)
    ),
    url("../assets/food.png");
  margin: 15px;
  padding: 0;
}

.col-md-auto {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

.categories {
  list-style: none;
  display: flex;
}

ul {
  margin: 0;
  display: flex;
  max-width: 80vw;
  padding: 0;
  overflow: auto;
  overflow-y: hidden;
}

h3 {
  padding-left: 15px;
  padding-top: 15px;
}
</style>
