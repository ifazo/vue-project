<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="rounded-lg bg-white overflow-hidden shadow">
        <h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
        <div class="bg-white p-6">
            <div class="sm:flex sm:items-center sm:justify-between">
                <div class="sm:flex sm:space-x-5">
                    <div class="flex-shrink-0">
                        <img class="mx-auto h-20 w-20 rounded-full" :src="photo" alt="user" />
                    </div>
                    <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                        <p class="text-sm font-medium text-gray-600">Welcome back,</p>
                        <p class="text-xl font-bold text-gray-900 sm:text-2xl">{{ name }}</p>
                        <p class="text-sm font-medium text-gray-600">{{ email }}</p>
                    </div>
                </div>
                <div class="mt-5 flex justify-center sm:mt-0">
                    <a href="#"
                        class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Edit profile </a>
                </div>
            </div>
        </div>
        <div
            class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
            <div class="px-6 py-5 text-sm font-medium text-center">
                <span class="text-gray-900">User id: </span>
                {{ ' ' }}
                <span class="text-gray-600">{{ uid }}</span>
            </div>
            <div class="px-6 py-5 text-sm font-medium text-center">
                <span class="text-gray-900">Created at: </span>
                {{ ' ' }}
                <span class="text-gray-600">{{ createdAt }}</span>
            </div>
            <div class="px-6 py-5 text-sm font-medium text-center">
                <span class="text-gray-900">Last login: </span>
                {{ ' ' }}
                <span class="text-gray-600">{{ lastLogAt }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    user: {
        type: Object,
        required: true,
    }
})
const photo = props.user.photoURL || "https://pic.onlinewebfonts.com/thumbnails/icons_107378.svg";
const name = props.user.displayName || 'Anonymous';
const email = props.user.email || 'No email';
const createdAt = new Date(Number(props.user.createdAt)).toLocaleDateString("en-US");
const lastLogAt = new Date(Number(props.user.lastLoginAt)).toLocaleDateString("en-US");
const uid = props.user.uid || 'No id';
</script>
