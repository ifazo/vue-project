<template>
    <Toast />
    <TransitionRoot as="template" :show="isOpen">
        <Dialog class="relative z-10" @close="onClose">
            <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template"
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enter-from="translate-x-full" enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md">
                                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div class="flex items-start justify-between">
                                            <DialogTitle class="text-lg font-medium text-gray-900">Shopping cart
                                            </DialogTitle>
                                            <div class="ml-3 flex h-7 items-center">
                                                <button type="button"
                                                    class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    @click="onClose">
                                                    <span class="absolute -inset-0.5" />
                                                    <span class="sr-only">Close panel</span>
                                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>

                                        <div v-if="products.length === 0" class="mt-8">
                                            <div className="flex items-center justify-center h-full">
                                                <p className="text-gray-500 text-lg">
                                                    No products in the cart
                                                </p>
                                            </div>
                                        </div>
                                        <div v-else class="mt-8">
                                            <div class="flow-root">
                                                <ul role="list" class="-my-6 divide-y divide-gray-200">
                                                    <li v-for="product in products" :key="product._id"
                                                        class="flex py-6">
                                                        <div
                                                            class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img :src="product.thumbnail" :alt="product.title"
                                                                class="h-full w-full object-cover object-center" />
                                                        </div>

                                                        <div class="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div
                                                                    class="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3><a :href="product._id">{{ product.title }}</a>
                                                                    </h3>
                                                                    <p class="ml-4">{{ product.price }}</p>
                                                                </div>
                                                                <p class="mt-1 text-sm text-gray-500">{{ product.brand
                                                                    }}</p>
                                                            </div>
                                                            <div class="flex flex-1 items-end justify-between text-sm">
                                                                <p class="text-gray-500">Qty: {{ product.quantity }}</p>
                                                                <div class="flex">
                                                                    <button type="button"
                                                                        @click="removeFromCart(product._id)"
                                                                        class="font-medium text-indigo-600 hover:text-indigo-500">
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="products.length !== 0" class="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div class="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${{ total }}</p>
                                        </div>
                                        <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at
                                            checkout.</p>
                                        <div class="mt-6">
                                            <button @click="handlePayment(products, displayName, email)"
                                                class="w-full text-left flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                                Checkout
                                            </button>
                                        </div>
                                        <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or{{ ' ' }}
                                                <button type="button"
                                                    class="font-medium text-indigo-600 hover:text-indigo-500"
                                                    @click="onClose">
                                                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { loadStripe } from '@stripe/stripe-js';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

const props = defineProps({
    isOpen: Boolean,
    onClose: Function,
    products: Array,
    total: Number
})

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const cartStore = useCartStore()
const userStore = useUserStore();

const user = computed(() => userStore.user);
const displayName = computed(() => user.value?.displayName || '');
const email = computed(() => user.value?.email || '');

const handlePayment = async (products, displayName, email) => {
    const stripe = await stripePromise;
    if (!stripe) {
        return;
    }
    if (!displayName || !email) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please sign in to continue' });
        return router.push('/sign-in');
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products, name: displayName, email }),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
        console.error(result.error.message);
    }
};

const removeFromCart = (id) => {
    cartStore.removeFromCart(id)
}

onMounted(() => {
    userStore.initializeUser();
    cartStore.initializeCart();
});
</script>
