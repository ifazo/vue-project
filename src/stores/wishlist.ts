import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

interface WishlistItem {
    id: number;
    name: string;
    price: number;
}

export const useWishlistStore = defineStore('wishlist', () => {
    const wishlist = ref<WishlistItem[]>([]);

    const total = computed(() => wishlist.value.reduce((acc, item) => acc + item.price, 0));

    function addToWishlist(item: WishlistItem) {
        wishlist.value.push(item);
    }

    function removeFromWishlist(id: number) {
        wishlist.value = wishlist.value.filter((item) => item.id !== id);
    }

    function clearWishlist() {
        wishlist.value = [];
    }

    return { wishlist, total, addToWishlist, removeFromWishlist, clearWishlist };
});