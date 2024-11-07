<template>
    <div v-if="loading">Loading Categories...</div>
    <div v-else-if="error">Error loading categories: {{ error.message }}</div>
    <!-- Card Section -->
    <div v-else class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <!-- Grid -->
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            <!-- Card -->
            <RouterLink v-for="category in categories" :key="category.slug"
                class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
                :to="`/categories/${category.slug}`">
                <div class="p-4 md:p-5">
                    <div class="flex justify-between items-center gap-x-3">
                        <div class="grow">
                            <div class="flex items-center gap-x-3">
                                <span className="size-[38px] rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                    {{category.icon}}
                                </span>
                                <div class="grow">
                                    <h3
                                        class="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                        {{ category.name }}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div>
                            <svg class="shrink-0 size-5 text-gray-800 dark:text-neutral-200"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </div>
                    </div>
                </div>
            </RouterLink>
            <!-- End Card -->
        </div>
        <!-- End Grid -->
    </div>
    <!-- End Card Section -->
</template>

<script setup>
import { ref, onMounted } from 'vue';

const categories = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        const data = await response.json();
        categories.value = data;
        loading.value = false;
    } catch (error) {
        error.value = error;
    }
});
</script>