<template>
  <div class="div">
    <div class="div-2">
      <form
        @submit="
          $event.preventDefault();
          addItem();
        "
      >
        <input
          placeholder="Add new item..."
          class="shadow-md rounded w-full px-4 py-2"
          :value="newItemName"
          @input="setItemName($event)"
        />

        <button
          class="bg-blue-500 rounded w-full text-white font-bold py-2 px-4 button"
        >
          Add list item
        </button>
      </form>

      <ul class="shadow-md rounded">
        <todo-item
          v-for="(item, index) in list"
          :item="item"
          :key="index"
        ></todo-item>
      </ul>

      <button
        class="m-4 text-gray-500 w-full"
        v-if="list.length"
        @click="clear()"
      >
        Clear
      </button>
    </div>
  </div>
</template>
<script>
const TodoItem = () => import("./todo-item.vue");

export default {
  name: "to-do-app",
  components: { "todo-item": TodoItem },

  data: () => ({ list: ["hello", "world"], newItemName: "" }),

  methods: {
    setItemName(event) {
      this.newItemName = event.target.value;
    },
    addItem() {
      this.list = [...this.list, this.newItemName];
      this.newItemName = "";
    },
    clear() {
      this.list = [];
    },
  },
};
</script>
<style scoped>
.div {
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.div-2 {
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
}
.button {
  margin: 10px 0;
}
</style>
