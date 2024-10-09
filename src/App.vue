<template>
  <TheNavbar />
  <RouterView />
  <TheFooter />
</template>

<script setup>
import TheFooter from './components/TheFooter.vue'
import { RouterView } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue';
</script>

<style scoped></style>
