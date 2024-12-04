<template>
    <Toast />
    <div class="card">
        <DataView :value="products">
            <template #list="slotProps">
                <div class="flex flex-col">
                    <div v-for="(item, index) in slotProps.items" :key="index">
                        <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                            :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                            <div class="md:w-40 relative">
                                <img class="block xl:block mx-auto rounded w-full" :src="item.thumbnail"
                                    :alt="item.title" />
                                <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                                    <Tag :value="item.availabilityStatus" :severity="getSeverity(item)"></Tag>
                                </div>
                            </div>
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div>
                                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                                            item.brand }}</span>
                                        <div class="text-xl font-semibold mt-2">{{ item.title }}</div>
                                    </div>
                                    <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                            style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                            <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                            <i class="pi pi-star-fill text-yellow-500"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col md:items-end gap-4">
                                    <span class="text-lg font-medium">${{ item.price }}</span>
                                    <span class="text-base font-medium">Quantity: {{ item.quantity }}</span>
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <Button @click="removeFromCart(item._id)" icon="pi pi-trash" severity="danger"
                                            outlined></Button>
                                        <Button @click="handlePayment([item], displayName, email)"
                                            icon="pi pi-shopping-cart" label="Buy Now" severity="secondary"
                                            :disabled="item.availabilityStatus === 'Out of Stock'"
                                            class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
        <Divider />
        <div class="flex justify-between m-8">
            <div class="text-xl font-semibold mt-2">Total amount: ${{ cartStore.total.toFixed(2) }}</div>
            <Button @click="handlePayment(products, displayName, email)" icon="pi pi-send" :label="'Pay $' + cartStore.total.toFixed(2)"
                severity="secondary" :disabled="cartStore.total === 0"
                class="flex-auto md:flex-initial whitespace-nowrap px-8" />
        </div>
    </div>
</template>

<script setup>
import DataView from 'primevue/dataview';
import Button from "primevue/button";
import { loadStripe } from '@stripe/stripe-js';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { computed, onMounted } from 'vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import Divider from 'primevue/divider';

const props = defineProps({
    products: {
        type: Array,
        required: true,
    }
})

const toast = useToast();

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
    toast.add({ severity: 'success', summary: 'Success', detail: 'Product removed from cart' });
}

onMounted(() => {
    userStore.initializeUser();
    cartStore.initializeCart();
});

const getSeverity = (product) => {
    switch (product.inventoryStatus) {
        case 'In Stock':
            return 'success';

        case 'Low Stock':
            return 'warn';

        case 'Out of Stock':
            return 'danger';

        default:
            return null;
    }
};
</script>
