<template>
  <link
    href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
    rel="stylesheet"
  />

  <div
    class="bg-gray-100 border-gray-200 border-b-2 flex flex-col md:flex-row p-2 mb-8"
  >
    <div class="flex flex-row justify-center">
      <a
        v-for="(link, index) in frameworks"
        :href="link.url + (path || '/')"
        :class="_classStringToObject(this.getClassForFrameworkLink(link))"
        :key="index"
      >
        {{ link.text || link.name }}
      </a>
    </div>
    <div class="flex flex-row justify-center md:ml-auto">
      <a
        v-for="(example, index) in examples"
        :href="example.url"
        :class="_classStringToObject(this.getclassForExampleLink(example))"
        :key="index"
      >
        {{ example.name }}
      </a>
    </div>
  </div>
</template>
<script>
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
