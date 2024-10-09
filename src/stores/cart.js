import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
    const cart = ref([]);

    const total = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));

    function addToCart(item) {
        cart.value.push(item);
    }

    function removeFromCart(id) {
        cart.value = cart.value.filter((item) => item.id !== id);
    }

    function clearCart() {
        cart.value = [];
    }

    return { cart, total, addToCart, removeFromCart, clearCart };
});
