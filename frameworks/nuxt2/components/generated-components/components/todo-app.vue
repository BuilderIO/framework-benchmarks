<template>
  <div class="div">
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
      <li
        class="border-gray-200 border-b li"
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>

    <button
      class="m-4 text-gray-500 w-full"
      v-if="list.length"
      @click="clear()"
    >
      Clear
    </button>
  </div>
</template>
<script>
export default {
  name: "to-do-app",

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
}
.button {
  margin: 10px 0;
}
.li {
  padding: 10px;
}
</style>
