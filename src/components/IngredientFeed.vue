<template>
  <div class="container">
    <!-- Example of how to use MDB rows to open the centered modal view -->
    <!-- <MDBRow center class="text-center">
      <h3>Vue Teleport Example</h3>
      <ModalView />
    </MDBRow> -->
    <div class="tool-bar">
      <div class="tool-bar-container">
        <button type="button" class="btn">Sort By</button>
      </div>
      <div class="tool-bar-container">
        <div class="form-outline">
          <input
            type="search"
            id="form1"
            class="form-control"
            placeholder="Search Ingredients"
            aria-label="Search"
          />
        </div>
        <!-- TODO replace with an actual material icon -->
        <button type="button" class="btn btn-primary btn-floating">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
    <!-- TODO it automatically moves to a new row, 
      if we want a sidescroller we need to set up an overflow system, scroll bar or button -->
    <div class="row">
      <div class="col-md-auto">
        <a href="#Dairy" class="btn type-of-food">Dairy</a>
      </div>
      <div class="col-md-auto">
        <a href="#Produce" class="btn type-of-food">Produce</a>
      </div>
      <div class="col-md-auto">
        <a href="#Vegetables" class="btn type-of-food">Vegetables</a>
      </div>
      <div class="col-md-auto">
        <a href="#Fruits" class="btn type-of-food">Fruits</a>
      </div>
      <div class="col-md-auto">
        <a href="#Misc1" class="btn type-of-food">Misc1</a>
      </div>
      <div class="col-md-auto">
        <a href="#Misc2" class="btn type-of-food">Misc2</a>
      </div>
      <div class="col-md-auto">
        <a href="#Misc3" class="btn type-of-food">Misc3</a>
      </div>
    </div>
    <div id="Dairy" class="row">
      <h3>Dairy</h3>
    </div>
    <div class="row">
      <li v-for="dairy in dairys" v-bind:key="dairy.id">
        <div class="col-md-auto">
          <button type="button" class="btn food-item">
            {{ dairy.foodName }}
          </button>
        </div>
      </li>
    </div>
    <div id="Produce" class="row">
      <h3>Produce</h3>
    </div>
    <div class="row">
      <li v-for="produce in produces" v-bind:key="produce.id">
        <div class="col-md-auto">
          <button type="button" class="btn food-item">
            {{ produce.foodName }}
          </button>
        </div>
      </li>
    </div>
    <div id="Vegetables" class="row">
      <h3>Vegetables</h3>
    </div>
    <div class="row">
      <li v-for="vegetable in vegetables" v-bind:key="vegetable.id">
        <div class="col-md-auto">
          <button type="button" class="btn food-item">
            {{ vegetable.foodName }}
          </button>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
// import ModalView from "@/components/ModalView";
// import { MDBRow } from "mdb-vue-ui-kit";
import { ref } from "vue";
export default {
  name: "IngredientFeed",
  components: {
    // ModalView,
    // MDBRow,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  setup() {
    const dairys = ref([
      {
        foodName: "Dairy1",
      },
      {
        foodName: "Dairy2",
      },
      {
        foodName: "Dairy3",
      },
      {
        foodName: "Dairy4",
      },
      {
        foodName: "Dairy5",
      },
      {
        foodName: "Dairy6",
      },
      {
        foodName: "Dairy7",
      },
    ]);
    const produces = ref([
      {
        foodName: "Produce1",
      },
      {
        foodName: "Produce2",
      },
      {
        foodName: "Produce3",
      },
      {
        foodName: "Produce4",
      },
      {
        foodName: "Produce5",
      },
      {
        foodName: "Produce6",
      },
      {
        foodName: "Produce7",
      },
    ]);
    const vegetables = ref([
      {
        foodName: "Veg1",
      },
      {
        foodName: "Veg2",
      },
      {
        foodName: "Veg3",
      },
      {
        foodName: "Veg4",
      },
      {
        foodName: "Veg5",
      },
      {
        foodName: "Veg6",
      },
      {
        foodName: "Veg7",
      },
    ]);

    return {
      dairys,
      produces,
      vegetables,
    };
  },
};
</script>

<style scoped>
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
  width: 100px;
  height: 100px;
  border-radius: 15px;
  text-align: center;
  line-height: 150px;
  background-color: lightgrey;
  margin: 15px;
}

.food-item {
  width: 150px;
  height: 200px;
  border-radius: 15px;
  text-align: left;
  line-height: 300px;
  font-size: 2rem;
  color: white;
  background-image: linear-gradient(
      to bottom,
      rgb(255 255 255 / 0%),
      rgb(0 0 0 / 73%)
    ),
    url("../assets/food.png");
  margin: 15px;
}

.col-md-auto {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}
</style>
