<template>
    <div class="bg-white">
        <div class="py-8 sm:py-12 lg:mx-auto lg:max-w-7xl lg:px-8">
            <div class="flex items-center justify-between px-4 sm:px-6 lg:px-0">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">Feature products</h2>
                <RouterLink :to="'/products'"
                    class="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                    See all products
                    <span aria-hidden="true"> &rarr;</span>
                </RouterLink>
            </div>

            <div class="relative mt-8">
                <div class="relative -mb-6 w-full overflow-x-auto pb-6">
                    <ul role="list"
                        class="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-x-0">
                        <li v-for="product in products" :key="product._id"
                            class="inline-flex w-64 flex-col text-center lg:w-auto">
                            <div class="group relative">
                                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                                    <img :src="product.thumbnail" :alt="product.title"
                                        class="h-full w-full object-cover object-center group-hover:opacity-75" />
                                </div>
                                <div class="mt-6">
                                    <p class="text-sm text-gray-500">{{ product.brand ? product.brand : 'None' }}</p>
                                    <h3 class="mt-1 font-semibold text-gray-900">
                                        <RouterLink :to="`/products/${product._id}`">
                                            <span class="absolute inset-0" />
                                            {{
                                                product.title.length > 20
                                                    ? product.title.slice(0, 20) + '...'
                                            : product.title
                                            }}
                                        </RouterLink>
                                    </h3>
                                    <p class="mt-1 text-gray-900">${{ product.price }}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="mt-12 flex px-4 sm:hidden">
                <RouterLink :to="'/products'" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    See all products
                    <span aria-hidden="true"> &rarr;</span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const products = ref([]);
const loading = ref(true);
const error = ref(null);
console.log(products);
onMounted(async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products/random`);
        const data = await response.json();
        products.value = data;
        loading.value = false;
    } catch (error) {
        error.value = error;
    }
});
</script>