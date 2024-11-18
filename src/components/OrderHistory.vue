<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="bg-white">
        <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
            <div class="max-w-xl">
                <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
                <p class="mt-2 text-sm text-gray-500">Check the status of recent orders, manage returns, and download
                    invoices.</p>
            </div>

            <div class="mt-16">
                <h2 class="sr-only">Recent orders</h2>

                <div class="space-y-20">
                    <div v-for="order in orders" :key="order._id">
                        <h3 class="sr-only">
                            Order placed on <time :datetime="order.createdAt">
                                {{ new Date(order.createdAt).toLocaleString() }}
                            </time>
                        </h3>

                        <div
                            class="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                            <dl
                                class="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                <div class="flex justify-between sm:block">
                                    <dt class="font-medium text-gray-900">Date placed</dt>
                                    <dd class="sm:mt-1">
                                        <time :datetime="order.createdAt">
                                            {{ new Date(order.createdAt).toLocaleString() }}
                                        </time>
                                    </dd>
                                </div>
                                <div class="flex justify-between pt-6 sm:block sm:pt-0">
                                    <dt class="font-medium text-gray-900">Order status</dt>
                                    <dd class="sm:mt-1">
                                        {{ order.status }}
                                    </dd>
                                </div>
                                <div class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                    <dt>Total amount</dt>
                                    <dd class="sm:mt-1">
                                       ${{ order.total.toFixed(2) }}
                                    </dd>
                                </div>
                            </dl>
                            <a :href="order._id"
                                class="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0">
                                View Invoice
                                <span class="sr-only">for order {{ order._id }}</span>
                            </a>
                        </div>

                        <table class="mt-4 w-full text-gray-500 sm:mt-6">
                            <caption class="sr-only">
                                Products
                            </caption>
                            <thead class="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                                <tr>
                                    <th scope="col" class="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal">Product</th>
                                    <th scope="col" class="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell">Price</th>
                                    <th scope="col" class="hidden pr-8 py-3 font-normal sm:table-cell">Quantity</th>
                                    <th scope="col" class="hidden pr-8 py-3 font-normal sm:table-cell">Shipping</th>
                                    <th scope="col" class="w-0 py-3 font-normal text-right">Info</th>
                                </tr>
                            </thead>
                            <tbody class="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                                <tr v-for="product in order.products" :key="product._id">
                                    <td class="py-6 pr-8">
                                        <div class="flex items-center">
                                            <img :src="product.thumbnail" :alt="product.title"
                                                class="w-16 h-16 object-center object-cover rounded mr-6" />
                                            <div>
                                                <div class="font-medium text-gray-900">{{ product.title }}</div>
                                                <div class="mt-1 sm:hidden">${{ product.price }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="hidden py-6 pr-8 sm:table-cell">
                                        ${{ product.price }}
                                    </td>
                                    <td class="hidden py-6 pr-8 sm:table-cell">
                                        {{ product.quantity }} pieces
                                    </td>
                                    <td class="hidden py-6 pr-8 sm:table-cell">
                                        {{ product.shippingInformation }}
                                    </td>
                                    <td class="py-6 font-medium text-right whitespace-nowrap">
                                        <a :href="product._id" class="text-indigo-600">View<span
                                                class="hidden lg:inline"> Product</span><span class="sr-only">, {{
                                                    product.title }}</span></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    user: {
        type: Object,
        required: true,
    }
})

const orders = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const email = props.user?.email;
        if (!email) {
            error.value = 'User email is required';
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/orders?email=${email}`);
        const data = await response.json();
        orders.value = data;
        loading.value = false;
    } catch (error) {
        error.value = error;
        loading.value = false;
    }
});
</script>