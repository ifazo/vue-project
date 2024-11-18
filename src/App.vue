<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>

<script setup>
import TheFooter from './components/TheFooter.vue'
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue';
</script>

<style scoped></style>
