<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="bg-white">
        <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 class="text-xl font-bold text-gray-900">Product Wishlist</h2>

            <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                <div v-for="product in products" :key="product.id">
                    <div class="relative">
                        <div class="relative w-full h-72 rounded-lg overflow-hidden">
                            <img :src="product.imageSrc" :alt="product.imageAlt"
                                class="w-full h-full object-center object-cover" />
                        </div>
                        <div class="relative mt-4">
                            <h3 class="text-sm font-medium text-gray-900">{{ product.name }}</h3>
                            <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                        </div>
                        <div
                            class="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                            <div aria-hidden="true"
                                class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                            <p class="relative text-lg font-semibold text-white">{{ product.price }}</p>
                        </div>
                    </div>
                    <div class="mt-6">
                        <a :href="product.href"
                            class="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200">
                            Add to Cart
                            <span class="sr-only">, {{ product.name }}</span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const products = [
    {
        id: 1,
        name: 'Zip Tote Basket',
        color: 'White and black',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
        imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
        price: '$140',
    },
    {
        id: 2,
        name: 'Zip Tote Basket',
        color: 'Black and white',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-02.jpg',
        imageAlt: 'Front of zip tote bag with black canvas, white canvas straps and handle, and white zipper pulls.',
        price: '$140',
    },
    {
        id: 3,
        name: 'Leather Key Ring',
        color: 'Natural',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-03.jpg',
        imageAlt: 'Top view of leather key ring with split key ring to hold keys, brass metal hardware, and hand-stitched dark tan leather.',
        price: '$32',
    },
    {
        id: 4,
        name: 'Leather Key Ring',
        color: 'Black',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-04.jpg',
        imageAlt: 'Top view of leather key ring with split key ring to hold keys, brass metal hardware, and hand-stitched black leather.',
        price: '$32',
    }
]
</script>
