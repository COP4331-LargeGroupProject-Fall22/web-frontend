<template>
  <div class="container">
    <div class="tool-bar">
      <div class="tool-bar-container">
        <button type="button"
          class="btn btn-sortBy dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"> {{ selected }} 
        </button>
        <div class="dropdown-menu">
          <ul v-for="filter in sortByFilters" v-bind:key="filter">
            <div class="options">
              <div v-if="filter == selected">
                <a @click="selected = filter" class="dropdown-item active">{{ filter }}</a>
              </div>
              <div v-else>
                <a @click="selected = filter" class="dropdown-item">{{ filter }}</a>
              </div>
            </div>
          </ul>
        </div>
        <!-- TODO(58): delete if my change works -->
        <!-- <div>
          <select v-model="selected" class="form-control sl">
            <option v-for="filter in sortByFilters" v-bind:key="filter">
              {{ filter }}
            </option>
          </select>
        </div> -->
      </div>
      <div class="tool-bar-container">
        <div class="form-outline">
          <input
            id="searchShopping"
            aria-label="Search"
            autocomplete="off"
            placeholder="Search Shopping List..."
            v-model="searchString"
            type="text"
            class="form-control"
          />
        </div>
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
            @saveChanges="handleAddToShoppingList"
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
      <div class="container mt-3">
        <div class="row">
          <shopping-list-ingredient-view
            @closeModal="
              showIndividualIngredient = false;
              this.getShoppingListItems();
            "
            @saveChanges="showIndividualIngredient = false"
            :showModal="showIndividualIngredient"
            :modalTitle="individualIngredientTitle"
            :ingredientId="ingredientId"
          >
          </shopping-list-ingredient-view>
        </div>
      </div>
    </div>
    <div class="row">
      <ul>
        <li>
          <div v-for="category in filteredItems" :key="category">
            <div :id="category.name" class="row">
              <h3>{{ category.name }}</h3>
            </div>
            <div v-for="item in category.items" :key="item">
              <div class="row">
                <ul>
                  <div class="btn-group">
                    <button
                      type="button"
                      @click="
                        showIndividualIngredient = true;
                        ingredientId = item.itemID;
                        individualIngredientTitle = item.name;
                      "
                      class="btn shopping-item"
                    >
                      <div
                        class="shopping-item-pic"
                        v-bind:style="{
                          backgroundImage:
                            'linear-gradient(to bottom,rgb(255 255 255 / 0%),rgb(0 0 0 /73%)),url(' +
                            item.image.srcUrl +
                            ')',
                        }"
                      ></div>
                      <div class="shopping-text">
                        {{ item.name }}
                      </div>
                      <br />
                      <div class="amount-needed">
                        Amount needed: {{ item.quantity.value }}
                        {{ item.quantity.unit }}
                      </div>
                    </button>
                    <button
                      type="button"
                      class="btn cancel dropdown-toggle-split"
                      @click="deleteItem(item)"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                    <button
                      type="button"
                      class="btn confirm dropdown-toggle-split"
                      @click="addItemToInventory(item)"
                    >
                      <i class="fas fa-check"></i>
                    </button>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="isEmptyShoppingList">
        <h3>Your shopping list is empty, try adding some items!</h3>
      </div>
      <div v-if="!isEmptyShoppingList && noMatchesForSearchString">
        <h3>No items matching search string: "{{ searchString }}"</h3>
      </div>
    </div>
  </div>
</template>

<script>
import ModalView from "@/components/ModalView.vue";
import AddIngredientView from "@/components/AddIngredientView.vue";
import ShoppingListIngredientView from "@/components/ShoppingListIngredientView.vue";

import { util } from "@/globals.js";

export default {
  name: "IngredientFeed",
  components: {
    ModalView,
    AddIngredientView,
    ShoppingListIngredientView,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    // TODO(68): extract to util; same logic for all feeds
    filteredItems() {
      let searchString = this.searchString.toLowerCase();
      if (!searchString.length) {
        return this.shoppingListItems;
      }
      let filtered = {};
      for (const cat in this.shoppingListItems) {
        for (const item of this.shoppingListItems[cat].items) {
          if (item.name.toLowerCase().includes(searchString)) {
            if (!(cat in filtered)) {
              filtered[cat] = {
                name: cat,
                items: {},
              };
            }
            filtered[cat].items[item.name] = item;
          }
        }
      }
      return filtered;
    },
    noMatchesForSearchString() {
      return (
        this.searchString.length > 0 && util.isEmptyJson(this.filteredItems)
      );
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      shoppingListItems: {},
      isEmptyShoppingList: false,
      searchString: "",
      showCreateModal: false,
      createModalTitle: "Add ingredient to shopping list",
      createButtonText: "Add",
      add_ingredient_component: "add-ingredient-view",
      // Individual ingredient modal
      showIndividualIngredient: false,
      individualIngredientTitle: "",
      ingredientId: null,
      // Filters
      sortByFilters: [
        "Category",
        "Recipe",
        "Added First",
        "Added Last",
        "A-Z",
        "Z-A",
      ],
      selected: "Category",
    };
  },
  watch: {
    selected(newVal) {
      switch (newVal) {
        case "Category":
          this.getShoppingListItems();
          break;
        case "Recipe":
          this.getShoppingListItems({ sortByRecipe: true });
          break;
        case "Added First":
          this.getShoppingListItems({
            sortByDate: true,
          });
          break;
        case "Added Last":
          this.getShoppingListItems({ sortByDate: true, isReverse: true });
          break;
        case "A-Z":
          this.getShoppingListItems({ sortByLexicographicalOrder: true });
          break;
        case "Z-A":
          this.getShoppingListItems({
            sortByLexicographicalOrder: true,
            isReverse: true,
          });
          break;
        default:
          console.log("this should not happen. gg");
      }
    },
  },
  methods: {
    handleAddToShoppingList() {
      const newFoods = JSON.parse(
        JSON.stringify(this.$refs.add_ingredient_ref.ingredientsToAdd)
      );
      if (newFoods.length) {
        for (const food of newFoods) {
          this.$store.dispatch("ingredients/get", food.id).then(
            (response) => {
              let foodDetails = response.data;
              // Flatten, remove currency units - only USD
              foodDetails.price = foodDetails.price.price;
              foodDetails.dateAdded = Date.now();
              // TODO(69): Specify quantity here
              this.$store.dispatch("shoppinglist/post", response.data).then(
                () => {
                  this.getShoppingListItems();
                },
                (error) => {
                  this.message = util.getErrorString(error);
                }
              );
            },
            (error) => {
              this.message = util.getErrorString(error);
            }
          );
        }
      }
    },
    getShoppingListItems(params = { sortByCategory: true }) {
      this.$store.dispatch("shoppinglist/getAll", params).then(
        (response) => {
          // Each key in parsed is a category name
          let parsed = {};
          for (let i = 0; i < response.length; i++) {
            // Each element is 2-tuple of 1) category name, 2) data
            let categoryName = util.capitalizeFirstLetter(response[i][0]);
            parsed[categoryName] = {
              name: categoryName,
              items: response[i][1],
            };
          }
          this.shoppingListItems = parsed;
          this.isEmptyShoppingList = util.isEmptyJson(parsed);
        },
        (error) => {
          this.message = util.getErrorString(error);
        }
      );
    },
    // TODO(62): Update this to be a modal instead with more ingredient info
    // matching figma design
    deleteItem(item) {
      var result = confirm(
        "Are you sure you want to delete " +
          item.name +
          " from your shopping list?"
      );
      if (result) {
        this.$store.dispatch("shoppinglist/delete", item.itemID).then(
          () => {
            this.getShoppingListItems();
          },
          (error) => {
            console.log("failed to delete: " + error);
          }
        );
      }
    },
    // TODO(70): Update this to be a modal instead with more ingredient info
    // matching figma design
    addItemToInventory(item) {
      var result = confirm(
        "Are you sure you want to add " + item.name + " to your inventory?"
      );
      if (result) {
        this.$store.dispatch("shoppinglist/delete", item.itemID).then(
          () => {
            let inventoryItem = {};
            inventoryItem["id"] = item.id;
            inventoryItem["name"] = item.name;
            inventoryItem["category"] = item.category;
            inventoryItem["image"] = item.image;
            // TODO(50): update to get exp date when adding to inventory
            inventoryItem["expirationDate"] = null;
            this.$store.dispatch("inventory/post", inventoryItem).then(
              () => {
                this.getShoppingListItems();
              },
              (error) => {
                console.log("failed to delete: " + error);
              }
            );
          },
          (error) => {
            console.log("failed to delete: " + error);
          }
        );
      }
    },
  },
  beforeMount() {
    this.getShoppingListItems();
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

.dropdown-menu {
  display: none;
}

.btn-sortBy {
  color: black !important;
  background-color: white !important;
  border: none;
}

.btn-sortBy:hover,
.btn-sortBy:active,
.btn-sortBy:focus {
  color: white !important;
  background-color: #008600 !important;
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: #008600;
}

.shopping-item {
  width: 65vw;
  height: 10vw;
  border-radius: 15px;
  padding: 0 !important;
  display: flex;
}

.btn-group {
  margin: 15px;
  border-radius: 15px !important;
}

.shopping-item-pic {
  width: 10vw;
  height: 10vw;
  border-radius: 15px;
  background-size: auto;
  background-image: linear-gradient(
      to bottom,
      rgb(255 255 255 / 0%),
      rgb(0 0 0 / 73%)
    ),
    url("../assets/food.png");
  padding: 0;
}

.shopping-text,
.amount-needed {
  display: contents;
  text-align: left !important;
  color: black;
  padding: 10px;
}

.shopping-text {
  font-size: 1.5rem;
}

.amount-needed {
  font-size: 1rem;
}

.dropdown-toggle-split {
  width: 5vw;
  border-radius: 15px;
  font-size: 1.5rem;
}

.cancel:hover,
.cancel:active,
.cancel:focus {
  background-color: red;
  color: white;
}

.confirm:hover,
.confirm:active,
.confirm:focus {
  background-color: #33ff00;
  color: white;
}

.options {
  width: 100%;
}
</style>
