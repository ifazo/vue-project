<template>
  <div v-if="loading">Loading Products...</div>
  <div v-if="!loading" class="bg-white">
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="open">
          <Dialog as="div" class="fixed inset-0 flex z-40 sm:hidden" @close="open = false">
              <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                  enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                  leave-from="opacity-100" leave-to="opacity-0">
                  <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
              </TransitionChild>

              <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                  enter-from="translate-x-full" enter-to="translate-x-0"
                  leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                  leave-to="translate-x-full">
                  <div
                      class="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                      <div class="px-4 flex items-center justify-between">
                          <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                          <button type="button"
                              class="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                              @click="open = false">
                              <span class="sr-only">Close menu</span>
                              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                      </div>

                      <!-- Filters -->
                      <form class="mt-4">
                          <Disclosure as="div" class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                              <h3 class="-mx-2 -my-3 flow-root">
                                  <DisclosureButton
                                      class="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400">
                                      <span class="font-medium text-gray-900">
                                          Price
                                      </span>
                                      <span class="ml-6 flex items-center">
                                          <ChevronDownIcon
                                              :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                                              aria-hidden="true" />
                                      </span>
                                  </DisclosureButton>
                              </h3>
                              <DisclosurePanel class="pt-6">
                                  <div class="space-y-6">
                                      <div v-for="(option, index) in priceFilters" :key="option.value"
                                          class="flex items-center">
                                          <input :id="`filter-mobile-price-${index}`" :name="`price[]`"
                                              :value="option.value" type="radio" :checked="option.checked"
                                              @change="updatePriceFilter(option)"
                                              class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                          <label :for="`filter-mobile-price-${index}`"
                                              class="ml-3 text-sm text-gray-500">
                                              {{ option.label }}
                                          </label>
                                      </div>
                                  </div>
                              </DisclosurePanel>
                          </Disclosure>
                          <Disclosure as="div" class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                              <h3 class="-mx-2 -my-3 flow-root">
                                  <DisclosureButton
                                      class="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400">
                                      <span class="font-medium text-gray-900">
                                          Rating
                                      </span>
                                      <span class="ml-6 flex items-center">
                                          <ChevronDownIcon
                                              :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                                              aria-hidden="true" />
                                      </span>
                                  </DisclosureButton>
                              </h3>
                              <DisclosurePanel class="pt-6">
                                  <div class="space-y-6">
                                      <div v-for="(option, index) in ratingFilters" :key="option.value"
                                          class="flex items-center">
                                          <input :id="`filter-mobile-rating-${index}`" :name="`rating[]`"
                                              :value="option.value" type="radio" :checked="option.checked"
                                              @change="updateRatingFilter(option)"
                                              class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                          <label :for="`filter-mobile-rating-${index}`"
                                              class="ml-3 text-sm text-gray-500">
                                              {{ option.label }}
                                          </label>
                                      </div>
                                  </div>
                              </DisclosurePanel>
                          </Disclosure>
                      </form>
                  </div>
              </TransitionChild>
          </Dialog>
      </TransitionRoot>

      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Products</h1>
          <p class="mt-4 max-w-xl text-sm text-gray-700">Check out our latest arrivals and must-have products.</p>
      </div>

      <!-- Filters -->
      <section aria-labelledby="filter-heading">
          <h2 id="filter-heading" class="sr-only">Filters</h2>

          <div class="relative z-10 bg-white border-b border-gray-200 pb-4">
              <div class="max-w-7xl mx-auto px-4 flex items-center justify-between sm:px-6 lg:px-8">
                  <Menu as="div" class="relative inline-block text-left">
                      <div>
                          <MenuButton
                              class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                              Sort
                              <ChevronDownIcon
                                  class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true" />
                          </MenuButton>
                      </div>

                      <transition enter-active-class="transition ease-out duration-100"
                          enter-from-class="transform opacity-0 scale-95"
                          enter-to-class="transform opacity-100 scale-100"
                          leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100"
                          leave-to-class="transform opacity-0 scale-95">
                          <MenuItems
                              class="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div class="py-1">
                                  <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                                  <button @click="changeSort(option)"
                                      :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'w-full text-left block px-4 py-2 text-sm']">
                                      {{ option.name }}
                                  </button>
                                  </MenuItem>
                              </div>
                          </MenuItems>
                      </transition>
                  </Menu>

                  <button type="button"
                      class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                      @click="open = true">Filters</button>

                  <div class="hidden sm:block">
                      <div class="flow-root">
                          <PopoverGroup class="-mx-4 flex items-center divide-x divide-gray-200">
                              <Popover class="px-4 relative inline-block text-left">
                                  <PopoverButton
                                      class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                      <span>Price</span>
                                      <ChevronDownIcon
                                          class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true" />
                                  </PopoverButton>

                                  <transition enter-active-class="transition ease-out duration-100"
                                      enter-from-class="transform opacity-0 scale-95"
                                      enter-to-class="transform opacity-100 scale-100"
                                      leave-active-class="transition ease-in duration-75"
                                      leave-from-class="transform opacity-100 scale-100"
                                      leave-to-class="transform opacity-0 scale-95">
                                      <PopoverPanel
                                          class="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          <form class="space-y-4">
                                              <div v-for="(option, index) in priceFilters" :key="option.value"
                                                  class="flex items-center">
                                                  <input :id="`filter-price-${index}`" :name="`price[]`"
                                                      :value="option.value" type="radio" :checked="option.checked"
                                                      @change="updatePriceFilter(option)"
                                                      class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                                  <label :for="`filter-price-${index}`"
                                                      class="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                      {{ option.label }}
                                                  </label>
                                              </div>
                                          </form>
                                      </PopoverPanel>
                                  </transition>
                              </Popover>
                              <Popover class="px-4 relative inline-block text-left">
                                  <PopoverButton
                                      class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                      <span>Rating</span>
                                      <ChevronDownIcon
                                          class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true" />
                                  </PopoverButton>

                                  <transition enter-active-class="transition ease-out duration-100"
                                      enter-from-class="transform opacity-0 scale-95"
                                      enter-to-class="transform opacity-100 scale-100"
                                      leave-active-class="transition ease-in duration-75"
                                      leave-from-class="transform opacity-100 scale-100"
                                      leave-to-class="transform opacity-0 scale-95">
                                      <PopoverPanel
                                          class="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          <form class="space-y-4">
                                              <div v-for="(option, index) in ratingFilters" :key="option.value"
                                                  class="flex items-center">
                                                  <input :id="`filter-rating-${index}`" :name="`rating[]`"
                                                      :value="option.value" type="radio" :checked="option.checked"
                                                      @change="updateRatingFilter(option)"
                                                      class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                                  <label :for="`filter-rating-${index}`"
                                                      class="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                      {{ option.label }}
                                                  </label>
                                              </div>
                                          </form>
                                      </PopoverPanel>
                                  </transition>
                              </Popover>
                          </PopoverGroup>
                      </div>
                  </div>
              </div>
          </div>
          <!-- Products list -->
          <ProductsList :products="products" :loading="loading" :error="error" />
          <!-- Pagination -->
          <Pagination :totalRecords="totalProducts" @updatePagination="handlePagination" />
      </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  Dialog,
  DialogOverlay,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import Pagination from '@/components/Pagination.vue'
import ProductsList from '@/components/ProductsList.vue'

const sortOptions = ref([
  { name: 'Ascending', current: true },
  { name: 'Descending', current: false },
  { name: 'Most popular', current: false },
  { name: 'Least popular', current: false },
  { name: 'Expensive', current: false },
  { name: 'Cheapest', current: false },
]);

const priceFilters = ref([
  { value: 50, label: '$0 - $50', checked: false },
  { value: 100, label: '$50 - $100', checked: false },
  { value: 200, label: '$100 - $200', checked: false },
  { value: 500, label: '$200 - $500', checked: false },
  { value: 999, label: '$500+', checked: false },
]);

const ratingFilters = ref([
  { value: 4, label: '⭐️⭐️⭐️⭐️ & Up', checked: false },
  { value: 3, label: '⭐️⭐️⭐️ & Up', checked: false },
  { value: 2, label: '⭐️⭐️ & Up', checked: false },
  { value: 1, label: '⭐️ & Up', checked: false },
]);

const open = ref(false)
const loading = ref(true);
const error = ref(null);

const products = ref([]);
const totalProducts = ref(0);
const limit = ref(12);
const skip = ref(0);

const price = ref("");
const rating = ref("");
const sortBy = ref('title');
const sortOrder = ref('asc');

const fetchProducts = async () => {
  loading.value = true;
  try {
      const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products?limit=${limit.value}&skip=${skip.value}&price=${price.value}&rating=${rating.value}&sortBy=${sortBy.value}&sort=${sortOrder.value}`
      );
      const data = await response.json();

      products.value = data.products;
      totalProducts.value = data.totalProducts;
  } catch (err) {
      error.value = err.message;
  } finally {
      loading.value = false;
  }
};

const handlePagination = ({ limit: newLimit, skip: newSkip }) => {
  limit.value = newLimit;
  skip.value = newSkip;
  fetchProducts();
};

const updatePriceFilter = (selectedOption) => {
  priceFilters.value.forEach(option => {
      option.checked = false;
  });
  selectedOption.checked = true;
  price.value = selectedOption.value;
  fetchProducts();
};

const updateRatingFilter = (selectedOption) => {
  ratingFilters.value.forEach(option => {
      option.checked = false;
  });
  selectedOption.checked = true;
  rating.value = selectedOption.value;
  fetchProducts();
};

const changeSort = (option) => {
  sortOptions.value.forEach((opt) => {
      opt.current = false;
  });
  option.current = true;

  switch (option.name) {
      case 'Ascending':
          sortBy.value = 'title';  // Sort by title
          sortOrder.value = 'asc'; // Ascending order
          break;
      case 'Descending':
          sortBy.value = 'title';  // Sort by title
          sortOrder.value = 'desc'; // Descending order
          break;
      case 'Most popular':
          sortBy.value = 'rating';  // Sort by rating
          sortOrder.value = 'desc'; // High to low rating
          break;
      case 'Least popular':
          sortBy.value = 'rating';  // Sort by rating
          sortOrder.value = 'asc';  // Low to high rating
          break;
      case 'Expensive':
          sortBy.value = 'price';   // Sort by price
          sortOrder.value = 'desc'; // High to low price
          break;
      case 'Cheapest':
          sortBy.value = 'price';   // Sort by price
          sortOrder.value = 'asc';  // Low to high price
          break;
      default:
          sortBy.value = 'title';   // Default to sorting by title
          sortOrder.value = 'asc';  // Ascending order
          break;
  }
  fetchProducts();
};

onMounted(() => {
  fetchProducts();
});
</script>
