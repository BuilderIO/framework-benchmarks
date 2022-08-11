<template>
  <div>
    <link
      href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <div
      class="bg-gray-100 border-gray-200 border-b-2 flex flex-col md:flex-row p-2 mb-8"
    >
      <div class="flex flex-row justify-center">
        <template :key="index" v-for="(link, index) in frameworks">
          <a
            :href="link.url + (path || '/')"
            :class="_classStringToObject(getClassForFrameworkLink(link))"
          >
            {{ link.text || link.name }}
          </a>
        </template>
      </div>
      <div class="flex flex-row justify-center md:ml-auto">
        <template :key="index" v-for="(example, index) in examples">
          <a
            :href="example.url"
            :class="_classStringToObject(getclassForExampleLink(example))"
          >
            {{ example.name }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { defineAsyncComponent } from "vue";

import { frameworks, examples } from "../links";

export default {
  name: "app-header",

  props: ["framework", "path"],

  data: () => ({ frameworks, examples }),

  methods: {
    getClassForFrameworkLink(link) {
      return `p-2 text-base font-medium capitalize ${
        this.framework === link.name
          ? "text-blue-500"
          : "text-gray-500 hover:text-gray-900"
      }`;
    },
    getclassForExampleLink(link) {
      return `p-2 text-base font-medium capitalize ${
        link.url === this.path
          ? "text-blue-500"
          : "text-gray-500 hover:text-gray-900"
      }`;
    },
    _classStringToObject(str) {
      const obj = {};
      if (typeof str !== "string") {
        return obj;
      }
      const classNames = str.trim().split(/\s+/);
      for (const name of classNames) {
        obj[name] = true;
      }
      return obj;
    },
  },
};
</script>
