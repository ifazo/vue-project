import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
    const cart = ref([]);

    const total = computed(() => cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0));

    function addToCart(item) {
        const existingItem = cart.value.find((i) => i._id === item._id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.value.push({ ...item, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart.value));
    }

    function removeFromCart(id) {
        cart.value = cart.value.filter((item) => item._id !== id);
        localStorage.setItem('cart', JSON.stringify(cart.value)); 
    }

    function clearCart() {
        cart.value = [];
        localStorage.removeItem('cart');
    }

    function initializeCart() {
        const storedCart = localStorage.getItem('cart');
        cart.value = storedCart ? JSON.parse(storedCart) : [];
    }

    return { cart, total, addToCart, removeFromCart, clearCart, initializeCart };
});
