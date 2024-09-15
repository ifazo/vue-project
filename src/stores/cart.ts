import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// Define a CartItem interface for type safety
interface CartItem {
    id: number;
    name: string;
    price: number;
}

export const useCartStore = defineStore('cart', () => {
    const cart = ref<CartItem[]>([]);

    const total = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));

    function addToCart(item: CartItem) {
        cart.value.push(item);
    }

    function removeFromCart(id: number) {
        cart.value = cart.value.filter((item) => item.id !== id);
    }

    function clearCart() {
        cart.value = [];
    }

    return { cart, total, addToCart, removeFromCart, clearCart };
});
