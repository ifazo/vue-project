<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<template>
    <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            
            <div class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                <div v-for="product in products" :key="product._id" class="group relative">
                    <div class="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                        <img :src="product.thumbnail" :alt="product.title" class="object-cover object-center" />
                        <div class="flex items-end p-4 opacity-0 group-hover:opacity-100" aria-hidden="true">
                            <div
                                class="w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                                View Product</div>
                        </div>
                    </div>
                    <div class="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                        <h3>
                            <RouterLink :to="`/products/${product._id}`">
                                <span aria-hidden="true" class="absolute inset-0" />
                                {{ product.title }}
                            </RouterLink>
                        </h3>
                        <p>${{ product.price }}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">{{ product.brand }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    products: {
        type: Array,
        required: true
    }
});
</script>