<template>
    <Toast />
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="!loading && !error">
        <div class="bg-white">
            <div class="card flex justify-between">
                <!-- <Breadcrumb :home="home" :model="items" /> -->
            </div>
            <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    <!-- Image gallery -->
                    <TabGroup as="div" class="flex flex-col-reverse">
                        <!-- Image selector -->
                        <div class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                            <TabList class="grid grid-cols-4 gap-6">
                                <Tab v-for="image in product.images" :key="image"
                                    class="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                                    v-slot="{ selected }">
                                    <span class="sr-only">
                                        {{ image }}
                                    </span>
                                    <span class="absolute inset-0 rounded-md overflow-hidden">
                                        <img :src="image" alt="" class="w-full h-full object-center object-cover" />
                                    </span>
                                    <span
                                        :class="[selected ? 'ring-indigo-500' : 'ring-transparent', 'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none']"
                                        aria-hidden="true" />
                                </Tab>
                            </TabList>
                        </div>

                        <TabPanels class="w-full aspect-w-1 aspect-h-1">
                            <TabPanel v-for="image in product.images" :key="image">
                                <img :src="image" alt=""
                                    class="w-full h-full object-center object-cover sm:rounded-lg" />
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>

                    <!-- Product info -->
                    <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ product.title }}</h1>

                        <div class="mt-3">
                            <h2 class="sr-only">Product information</h2>
                            <p class="text-3xl text-gray-900">${{ product.price }}</p>
                        </div>

                        <!-- Reviews -->
                        <div class="mt-3">
                            <h3 class="sr-only">Reviews</h3>
                            <div class="flex items-center">
                                <div class="flex items-center">
                                    <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                                        :class="[product.rating > rating ? 'text-yellow-300' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']"
                                        aria-hidden="true" />
                                </div>
                                <p class="sr-only">{{ product.rating }} out of 5 stars</p>
                            </div>
                        </div>

                        <div class="mt-6">
                            <h3 class="sr-only">Description</h3>

                            <div class="text-base text-gray-700 space-y-6" v-html="product.description" />
                        </div>

                        <form class="mt-6">
                            <div class="mt-10 flex sm:flex-col1">
                                <button type="button" @click="addToCartHandler(product)"
                                    class="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
                                    Add to Bag
                                </button>

                                <button type="button"
                                    class="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                                    <ShareIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                    <span class="sr-only">Share</span>
                                </button>
                            </div>
                        </form>

                        <section aria-labelledby="details-heading" class="mt-12">
                            <h2 id="details-heading" class="sr-only">Additional details</h2>

                            <div class="border-t divide-y divide-gray-200">
                                <div>
                                    <h3>
                                        <button
                                            class="group relative w-full py-6 flex justify-between items-center text-left"
                                            disabled>
                                            <span class="text-indigo-600 text-sm font-medium">
                                                Details
                                            </span>
                                        </button>
                                    </h3>
                                    <!-- Always display the content -->
                                    <div class="pb-6 prose prose-sm">
                                            <ul role="list" class="space-y-4 mb-4">
                                                <div class="flex items-center">
                                                    <Briefcase class="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                                                    <span
                                                        class="text-sm font-medium text-gray-700 dark:text-gray-300">Brand:</span>
                                                    <span
                                                        class="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                                                        {{ product.brand }}
                                                    </span>
                                                </div>
                                                <div class="flex items-center">
                                                    <Folder class="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                                                    <span
                                                        class="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
                                                    <span
                                                        class="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                                                        {{ product.category }}
                                                    </span>
                                                </div>
                                                <div class="flex items-center">
                                                    <Weight class="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                                                    <span
                                                        class="text-sm font-medium text-gray-700 dark:text-gray-300">Weight:</span>
                                                    <span
                                                        class="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                                                        {{ product.weight }} gm
                                                    </span>
                                                </div>
                                                <div class="flex items-center">
                                                    <Package class="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                                                    <span
                                                        class="text-sm font-medium text-gray-700 dark:text-gray-300">Stock:</span>
                                                    <span
                                                        class="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                                                        {{ product.stock }} available
                                                    </span>
                                                </div>
                                                <div class="flex items-start">
                                                    <Tag class="w-5 h-5 mr-2 mt-1 text-gray-500 dark:text-gray-400" />
                                                    <span
                                                        class="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Tags:</span>
                                                    <div class="flex flex-wrap gap-2">
                                                        <span v-for="tag in product.tags" :key="tag"
                                                            class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-600">
                                                            {{ tag }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <Reviews :reviews="product.reviews" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Package, Tag, Briefcase, Folder, Weight } from 'lucide-vue-next'
import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/vue'
import { ShareIcon, StarIcon } from '@heroicons/vue/20/solid'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useCartStore } from '@/stores/cart'
import { useRoute } from 'vue-router';
import Reviews from './Reviews.vue'

const toast = useToast()
const route = useRoute();
const id = route.params.id;

const product = ref(null);
const loading = ref(true);
const error = ref(null);

const cartStore = useCartStore()

const fetchProduct = async () => {
    try {
        const response = await fetch(`https://ifaz-vue-server.vercel.app/api/products/${id}`);

        const data = await response.json();
        console.log("Fetched product:", data);
        product.value = data;
        loading.value = false;
    } catch (err) {
        error.value = err.message;
        loading.value = false;
    }
};

onMounted(() => {
    fetchProduct();
    cartStore.initializeCart();
});

const addToCartHandler = (product) => {
    cartStore.addToCart(product)
    toast.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart', life: 3000 })
}

</script>