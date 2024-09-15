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
          <HeartIcon class="w-6 h-6" />
          <span class="font-bold whitespace-nowrap">Wishlist</span>
        </Tab>
        <Tab value="3" as="div" class="flex-1 flex items-center justify-center gap-2">
          <ChartPieIcon class="w-6 h-6" />
          <span class="font-bold whitespace-nowrap">Orders</span>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0" as="p" class="m-0">
          <ProfileCard />
        </TabPanel>
        <TabPanel value="1" as="p" class="m-0">
          <ShoppingCart />
        </TabPanel>
        <TabPanel value="2" as="p" class="m-0">
          <ProductWishlist />
        </TabPanel>
        <TabPanel value="3" as="p" class="m-0">
          <OrderHistory />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import { UserCircleIcon, ShoppingBagIcon, ChartPieIcon, HeartIcon } from '@heroicons/vue/20/solid';
import ProfileCard from '@/components/ProfileCard.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import ProductWishlist from '@/components/ProductWishlist.vue';
import OrderHistory from '@/components/OrderHistory.vue';
</script>
