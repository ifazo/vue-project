<template>
  <Toast />
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  <div v-if="!loading && !error">
    <div class="bg-white">

      <div class="max-w-2xl mx-auto p-2 md:py-4 lg:max-w-7xl lg:p-8">
        <Breadcrumb :home="home" :model="items">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <RouterLink :to="href" v-bind="props.action" @click="navigate">
                <span :class="[item.icon, 'text-color']" />
                <span class="text-primary font-semibold">{{ item.label }}</span>
              </RouterLink>
            </router-link>
            <RouterLink v-else :to="item.url" :target="item.target" v-bind="props.action">
              <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
            </RouterLink>
          </template>
        </Breadcrumb>

        <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <!-- Image gallery -->
          <TabGroup as="div" class="flex flex-col-reverse">
            <!-- Image selector -->
            <div class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <TabList class="grid grid-cols-4 gap-6">
                <Tab v-for="image in product.images" :key="image"
                  class="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                  v-slot="{ selected }">
                  <span class="sr-only">
                    {{ image }}
                  </span>
                  <span class="absolute inset-0 rounded-md overflow-hidden">
                    <img :src="image" alt="" class="w-full h-full object-center object-cover" />
                  </span>
                  <span
                    :class="[selected ? 'ring-indigo-500' : 'ring-transparent', 'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none']"
                    aria-hidden="true" />
                </Tab>
              </TabList>
            </div>

            <TabPanels class="w-full aspect-w-1 aspect-h-1">
              <TabPanel v-for="image in product.images" :key="image">
                <img :src="image" alt="" class="w-full h-full object-center object-cover sm:rounded-lg" />
              </TabPanel>
            </TabPanels>
          </TabGroup>

          <!-- Product info -->
          <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ product.title }}</h1>

            <div class="mt-3">
              <h2 class="sr-only">Product information</h2>
              <p class="text-3xl text-gray-900">${{ product.price }}</p>
            </div>

            <!-- Reviews -->
            <div class="mt-3">
              <h3 class="sr-only">Reviews</h3>
              <div class="flex items-center">
                <div class="flex items-center">
                  <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                    :class="[product.rating > rating ? 'text-yellow-300' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']"
                    aria-hidden="true" />
                </div>
                <p class="pl-2">({{ product.rating }} out of 5 stars)</p>
              </div>
            </div>

            <div class="mt-6">
              <h3 class="sr-only">Description</h3>

              <div class="text-base text-gray-700 space-y-6" v-html="product.description" />
            </div>

            <div class="mt-6 flex items-center space-x-4">
              <button type="button" @click="decreaseQuantity"
                class="bg-gray-100 border border-gray-300 text-gray-700 font-bold rounded-md px-4 py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                -
              </button>

              <input type="number" v-model="quantity"
                class="w-16 font-bold text-center border border-gray-300 rounded-md py-2 focus:ring-indigo-500 focus:border-indigo-500"
                min="1" />

              <button type="button" @click="increaseQuantity"
                class="bg-gray-100 border border-gray-300 text-gray-700 font-bold rounded-md px-4 py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                +
              </button>
            </div>

            <div class="mt-6">
              <div class="mt-10 flex sm:flex-col1">
                <button type="button" @click="handlePayment(product, displayName, email)"
                  class="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
                  Buy ${{ (product.price * quantity).toFixed(2) }}
                </button>
                <button type="button" @click="addToCartHandler(product)"
                  class="ml-4 max-w-xs flex-1 bg-gray-100 border border-gray-300 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-400 sm:w-full">
                  <ShoppingBagIcon class="w-5 h-5 mr-3 text-gray-400" aria-hidden="true" />
                  Add to Cart
                </button>
              </div>
            </div>


            <section aria-labelledby="details-heading" class="mt-12">
              <h2 id="details-heading" class="sr-only">Additional details</h2>
              <div class="border-t divide-y divide-gray-200">
                <div>
                  <h3>
                    <button class="group relative w-full py-6 flex justify-between items-center text-left" disabled>
                      <span class="text-indigo-600 text-sm font-medium">
                        Details
                      </span>
                    </button>
                  </h3>
                  <!-- Always display the content -->
                  <div class="pb-6 prose prose-sm">
                    <ul role="list" class="space-y-4 mb-4">
                      <div class="flex items-center">
                        <Briefcase class="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Brand:</span>
                        <span
                          class="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                          {{ product.brand ? product.brand : 'None' }}
                        </span>
                      </div>
                      <div class="flex items-center">
                        <Folder class="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
                        <span
                          class="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                          {{ product.category }}
                        </span>
                      </div>
                      <div class="flex items-center">
                        <Weight class="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Weight:</span>
                        <span
                          class="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                          {{ product.weight }} gm
                        </span>
                      </div>
                      <div class="flex items-center">
                        <Package class="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Stock:</span>
                        <span
                          class="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                          {{ product.stock }} available
                        </span>
                      </div>
                      <div class="flex items-start">
                        <Tag class="w-5 h-5 mr-2 mt-1 text-gray-500 dark:text-gray-400" />
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Tags:</span>
                        <div class="flex flex-wrap gap-2">
                          <span v-for="tag in product.tags" :key="tag"
                            class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-600">
                            {{ tag }}
                          </span>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Reviews :reviews="product.reviews" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Package, Tag, Briefcase, Folder, Weight } from 'lucide-vue-next'
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/vue'
import { StarIcon } from '@heroicons/vue/20/solid'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useCartStore } from '@/stores/cart'
import { useRoute } from 'vue-router';
import Reviews from '@/components/Reviews.vue'
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/user'
import { loadStripe } from '@stripe/stripe-js'
import { computed } from 'vue'
import Breadcrumb from 'primevue/breadcrumb';

const toast = useToast()
const route = useRoute();
const id = route.params.id;

const product = ref(null);
const quantity = ref(1);

const loading = ref(true);
const error = ref(null);

const cartStore = useCartStore()
const userStore = useUserStore();

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);
    const data = await response.json();
    product.value = data;
    loading.value = false;
  } catch (err) {
    error.value = err.message;
    loading.value = false;
  }
});

const home = ref({
  icon: 'pi pi-home',
  route: '/'
});
const items = computed(() => [
  { label: 'Products', route: '/products' },
  { label: product.value.title, route: `/products/${product.value._id}` }
]);

const user = computed(() => userStore.user);
const displayName = computed(() => user.value?.displayName || '');
const email = computed(() => user.value?.email || '');

const handlePayment = async (product, displayName, email) => {
  const stripe = await stripePromise;
  if (!stripe) {
    return;
  }
  if (!displayName || !email) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please sign in to buy' });
    return route.push('/sign-in');
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ products: [product], name: displayName, email }),
  });
  if (!response.ok) {
    console.error("Payment request failed:", response.status, response.statusText);
    return;
  }
  const session = await response.json();
  const result = await stripe.redirectToCheckout({ sessionId: session.id });
  if (result.error) {
    console.error(result.error.message);
  }
};

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCartHandler = (product) => {
  cartStore.addToCart(product)
  toast.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart', life: 1500 })
}
</script>