<script setup>
import { useRoute, RouterView } from 'vue-router';
const path = useRoute().fullPath;
import AppHeader from './generated-components/components/app-header.vue';
</script>

<template>
  <div>
    <AppHeader framework="vue3" :path="path" />
    <RouterView />
  </div>
</template>
