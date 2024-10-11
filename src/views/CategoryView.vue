<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error loading products: {{ error.message }}</div>
  <div v-else>
    <ProductList :products="products" />
  </div>
</template>

<script setup>
import ProductList from '@/components/ProductList.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const products = ref([]);
const loading = ref(true);
const error = ref(null);

console.log("products", products);

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products?category=${slug}`);
    const data = await response.json();
    products.value = data.products;
    loading.value = false;
    error.value = null;
  } catch (error) {
    error.value = error;
  }
});

const slug = route.params.slug;
</script>
