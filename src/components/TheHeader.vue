<template>
    <Toast />
    <div class="card mx-auto max-w-7xl p-2">
        <Menubar :model="items">
            <template #start>
                <img class="h-8 w-auto" src="/logo.png" alt="logo" />
            </template>
            <template #item="{ item, props }">
                <RouterLink :to="item.href" v-ripple class="flex items-center" v-bind="props.action">
                    <span><i :class="item.icon"></i></span>
                    <span>{{ item.label }}</span>
                </RouterLink>
            </template>
            <template #end>
                <div class="flex items-center gap-4">
                    <OverlayBadge :value="products.length" severity="success">
                        <Button @click="openModal = !openModal" severity="secondary">
                            <i class="pi pi-shopping-cart"></i>
                        </Button>
                    </OverlayBadge>

                    <CartModal :isOpen="openModal" @close="openModal = false" :products="products"
                        :total="cartStore.total" />

                    <div v-if="!user" class="mx-4 flex flex-shrink-0 items-center">
                        <RouterLink to="/sign-in">
                            <Button label="Secondary" severity="secondary">
                                <i class="pi pi-user-plus" style="color: #708090"></i>
                                Sign in
                            </Button>
                        </RouterLink>
                    </div>

                    <div v-if="user" class="mx-4 flex flex-shrink-0 items-center">
                        <Button @click="handleSignOut" label="Sign out" severity="secondary">
                            <i class="pi pi-user-minus" style="color: #708090"></i>
                            Sign out
                        </Button>
                    </div>
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Menubar from 'primevue/menubar';
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useCartStore } from "@/stores/cart";
import { signOut } from "@/lib/firebase";
import { useToast } from "primevue/usetoast";
import CartModal from './CartModal.vue';
import Button from "primevue/button";
import Toast from "primevue/toast";
import OverlayBadge from 'primevue/overlaybadge';

const items = ref([
    {
        label: 'Home',
        href: '/',
        icon: 'pi pi-home'
    },
    {
        label: 'Products',
        href: '/products',
        icon: 'pi pi-images'
    },
    {
        label: 'Categories',
        href: '/categories',
        icon: 'pi pi-tags'
    },
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: 'pi pi-sliders-v'
    }
]);

const openModal = ref(false)

const toast = useToast()
const router = useRouter()

const user = computed(() => userStore.user);
const products = computed(() => cartStore.cart);

const userStore = useUserStore();
const cartStore = useCartStore();

onMounted(() => {
    userStore.initializeUser();
    const fetchedUser = userStore.user;
    
    if (fetchedUser) {
        user.value = {
            name: fetchedUser.displayName || 'Anonymous',
            email: fetchedUser.email || 'No email',
            imageUrl: fetchedUser.photoURL || "https://pic.onlinewebfonts.com/thumbnails/icons_107378.svg"
        };
    } else {
        user.value = null;
    }
    cartStore.initializeCart();
});

const handleSignOut = () => {
    signOut()
        .then(() => {
            user.value = null;
            userStore.removeUser(user)
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Sign out successfully!',
                life: 3000
            })
            router.push('/sign-in')
        })
        .catch((err) => {
            toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 })
        })
}

</script>
