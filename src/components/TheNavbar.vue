<template>
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 justify-between">
                <div class="flex">
                    <div class="-ml-2 mr-2 flex items-center md:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton
                            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span class="absolute -inset-0.5" />
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                    <div class="flex flex-shrink-0 items-center">
                        <img class="h-8 w-auto" src="/logo.png" alt="logo" />
                    </div>
                    <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                        <RouterLink v-for="item in navigation" :key="item.name" :to="item.href"
                            :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                            :aria-current="item.current ? 'page' : undefined">{{ item.name }}</RouterLink>
                    </div>
                </div>

                <div class="flex items-center">

                    <div v-if="!user" class="flex-shrink-0">
                        <RouterLink to="/sign-in"
                            class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                            <UserIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
                            Sign In
                        </RouterLink>
                    </div>

                    <div v-if="user" class="ml-4 flex flex-shrink-0 items-center">
                        <button type="button"
                           @click="openModal = !openModal"
                            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="absolute -inset-1.5" />
                            <span class="sr-only">View Bag</span>
                            <ShoppingBagIcon class="h-6 w-6" aria-hidden="true" />
                        </button>

                        <BagModal :isOpen="openModal" @close="openModal = false" :products="products" />

                        <!-- Profile dropdown -->
                        <Menu as="div" class="relative ml-3">
                            <div>
                                <MenuButton
                                    class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span class="absolute -inset-1.5" />
                                    <span class="sr-only">Open user menu</span>
                                    <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
                                </MenuButton>
                            </div>
                            <transition enter-active-class="transition ease-out duration-200"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <MenuItems
                                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                                    <RouterLink :to="item.href"
                                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                                        {{
                                            item.name }}</RouterLink>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                    <button type="button" @click="handleSignOut"
                                        :class="[active ? 'bg-gray-100' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700']">
                                        Sign out
                                    </button>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>

                </div>

            </div>
        </div>

        <DisclosurePanel class="md:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                <DisclosureButton v-for="item in navigation" :key="item.name" as="div"
                    :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                    :aria-current="item.current ? 'page' : undefined">
                    <RouterLink :to="item.href">{{ item.name }}</RouterLink>
                </DisclosureButton>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, ShoppingBagIcon, UserIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { onMounted, ref } from 'vue';
import { signOut } from '@/lib/firebase';
import { useUserStore } from '@/stores/user';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import BagModal from './BagModal.vue';

const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Product', href: '/products', current: false },
    { name: 'Category', href: '/categories', current: false },
]
const userNavigation = [
    { name: 'Profile', href: '/profile' },
    { name: 'Dashboard', href: '/dashboard' },
]

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]

const openModal = ref(false)
const user = ref(null);
const userStore = useUserStore();

const toast = useToast()
const router = useRouter()

onMounted(() => {
    userStore.initializeUser();
    const fetchedUser = userStore.user;
    if (fetchedUser) {
        user.value = {
            name: fetchedUser.displayName || 'Anonymous',
            email: fetchedUser.email,
            imageUrl: fetchedUser.photoURL || 'https://via.placeholder.com/150'
        };
    } else {
        user.value = null;
    }
});

const handleSignOut = () => {
    signOut().then(() => {
        user.value = null;
        userStore.setUser(user)
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Sign out successfully!',
            life: 3000
        })
    })
        .then(() => {
            router.push('/')
        })
        .catch((err) => {
            toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 })
        })
}

</script>