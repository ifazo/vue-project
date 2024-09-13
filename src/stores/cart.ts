import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// Define a CartItem interface for type safety
interface CartItem {
    id: number;
    name: string;
    price: number;
}

export const useCartStore = defineStore('cart', () => {
    // Define the cart as an array of CartItem
    const cart = ref<CartItem[]>([]);

    // Compute the total price of all items in the cart
    const total = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));

    // Function to add an item to the cart
    function addToCart(item: CartItem) {
        cart.value.push(item);
    }

    // Function to remove an item from the cart by index
    function removeFromCart(index: number) {
        cart.value.splice(index, 1);
    }

    // Function to clear the entire cart
    function clearCart() {
        cart.value = [];
    }

    // Return the state and actions
    return { cart, total, addToCart, removeFromCart, clearCart };
});
