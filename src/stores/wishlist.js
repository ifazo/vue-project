import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlist', () => {
    const wishlist = ref([]);

    const total = computed(() => wishlist.value.reduce((acc, item) => acc + item.price, 0));

    function addToWishlist(item) {
        wishlist.value.push(item);
    }

    function removeFromWishlist(id) {
        wishlist.value = wishlist.value.filter((item) => item.id !== id);
    }

    function clearWishlist() {
        wishlist.value = [];
    }

    return { wishlist, total, addToWishlist, removeFromWishlist, clearWishlist };
});