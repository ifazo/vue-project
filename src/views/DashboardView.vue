<template>
  <div class="card">
    <Tabs value="0">
      <TabList class="flex justify-center">
        <Tab value="0" as="div" class="flex-1 flex items-center justify-center gap-2">
          <UserCircleIcon class="w-6 h-6" />
          <span class="font-bold whitespace-nowrap">Profile</span>
        </Tab>
        <Tab value="1" as="div" class="flex-1 flex items-center justify-center gap-2">
          <ShoppingBagIcon class="w-6 h-6" />
          <span class="font-bold whitespace-nowrap">Cart</span>
        </Tab>
        <Tab value="2" as="div" class="flex-1 flex items-center justify-center gap-2">
          <ChartPieIcon class="w-6 h-6" />
          <span class="font-bold whitespace-nowrap">Orders</span>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0" as="p" class="m-0">
          <ProfileCard :user="user" />
        </TabPanel>
        <TabPanel value="1" as="p" class="m-0">
          <ShoppingCart :products="products" />
        </TabPanel>
        <TabPanel value="2" as="p" class="m-0">
          <OrderHistory :user="user" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup>
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import { UserCircleIcon, ShoppingBagIcon, ChartPieIcon } from '@heroicons/vue/20/solid';
import ProfileCard from '@/components/ProfileCard.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import OrderHistory from '@/components/OrderHistory.vue';
import { useUserStore } from '@/stores/user';
import { useCartStore } from '@/stores/cart';
import { computed, onMounted } from 'vue';

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
            email: fetchedUser.email,
            imageUrl: fetchedUser.photoURL || 'https://via.placeholder.com/150'
        };
    } else {
        user.value = null;
    }
    cartStore.initializeCart();
});
</script>
