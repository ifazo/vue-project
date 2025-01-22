<template>
  <Toast />
  <div>
    <button
      @click="openModal"
      class="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
    >
      Write a review
    </button>

    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="closeModal">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div>
                  <div
                    class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100"
                  >
                    <ChatBubbleLeftEllipsisIcon
                      class="h-6 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900"
                      >Leave a Review</DialogTitle
                    >
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">Give us your honest opinion...</p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 space-y-4">
                  <div class="flex justify-center">
                    <div class="flex space-x-1">
                      <button
                        v-for="i in 5"
                        :key="i"
                        @click="rating = i"
                        class="focus:outline-none"
                      >
                        <StarIcon
                          :class="[i <= rating ? 'text-yellow-400' : 'text-gray-300', 'h-8 w-8']"
                        />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label for="comment" class="block text-sm font-medium text-gray-700"
                      >Your comment</label
                    >
                    <div class="mt-1">
                      <textarea
                        id="comment"
                        v-model="comment"
                        rows="4"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Share your thoughts..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    @click="submitReview"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    @click="closeModal"
                    ref="cancelButtonRef"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { StarIcon } from '@heroicons/vue/24/solid'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/vue/24/outline'
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const props = defineProps({
  productId: {
    type: String,
    required: true
  }
})

const toast = useToast()
const router = useRouter()
const userStore = useUserStore()
const user = computed(() => userStore.user)
const displayName = computed(() => user.value?.displayName || 'Anonymous')
const email = computed(() => user.value?.email)

const open = ref(false)
const rating = ref(0)
const comment = ref('')

const openModal = () => {
  open.value = true
}

const closeModal = () => {
  open.value = false
  rating.value = 0
  comment.value = ''
}

const submitReview = async () => {
  if (!rating.value || comment.value === '') {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please fill in all fields',
      life: 3000
    })
    return
  }
  if (!email.value) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please login to submit a review',
      life: 3000
    })
    return router.push('/sign-in')
  }
  const reviewData = {
    rating: rating.value,
    comment: comment.value,
    reviewerName: displayName.value,
    reviewerEmail: email.value
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${props.productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reviewData)
  })
  if (!response.ok) {
    toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 })
  }
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Review submitted successfully',
    life: 3000
  })

  closeModal()
  window.location.reload()
}
</script>
